/*********EVENT LISTENERS*************/

$('#addFolder').on('click', e => {
	$('#addFolderFormDiv').toggleClass('hide show-inline');
});

$('#addFile').on('click', e => {
	$('#addFileFormDiv').toggleClass('hide show-inline');
});

$('#addFolderForm').on('submit', e => {
	e.preventDefault();
	let folderName = $('#folderNameInput').val();
	$.ajax({
		url: '/api/folders',
		type: 'POST',
		data: JSON.stringify({
			"name": folderName
		}), 
		dataType: 'json',
		contentType: 'application/json'
	}).then(data => {
		//first empty the container...
		$('#fileRowContainer').empty();
		//then re-write root folder rows
		getRootFiles();
	})

});

$('#fileRowContainer').on('submit', '#addNestedFolderForm', e => {
	e.preventDefault();
	let folderName = $('#nestedFolderNameInput').val();
	let $currFileRow = $(e.target).closest('.fileRow')
	let fileId = $currFileRow.attr('data-id');

	let url = '/api/folders/?parentId=' + fileId;
	
	$.ajax({
		url: url,
		type: 'POST',
		data: JSON.stringify({
			"name": folderName
		}), 
		dataType: 'json',
		contentType: 'application/json'
	}).then(data => {
		console.log('here');
		console.log(data);
		$('.addNestedFolderDiv').remove();
	})

});

//show/hide form to add nested form on click for +Add
$('#fileRowContainer').on('click', '.addNestedFolder', e => {
	let $currFileName = $(e.target).closest('.fileName');
	let $currFileRow = $(e.target).closest('.fileRow');
	let fileId = $currFileRow.attr('data-id');
	let fileParentId = $currFileRow.attr('data-parent');
	if ($currFileName.has('.addNestedFolderDiv').length === 0) {
		$('.addNestedFolderDiv').remove();
		let html = `<div class="addNestedFolderDiv">
				<form id="addNestedFolderForm">
					<input type="text" name="nestedFolderNameInput" id="nestedFolderNameInput"></input>
					<input type="submit" value="Add Folder" />
				</form>
			</div>`;
		$currFileName.append(html);
	} else {
		$('.addNestedFolderDiv').remove();
	}
});

//clicking on folders to open / load nested one level
$('#fileRowContainer').on('click', '.folder .fileName', e => {
	let $currFileRow = $(e.target).closest('.fileRow');
	let fileId = $currFileRow.attr('data-id');
	//has the data already been retrieved/loaded as html...
	if ($currFileRow.attr('data-subdataloaded') === "true") {
		console.log('here');
		$(`#fileRowContainer${fileId}`).toggleClass('show-block hide');
	} else {
		getNestedFiles(fileId);
	}
})

/*********FUNCTIONS*************/

function getNestedFiles(id) {
	let url = `/api/folders/${id}/items`;
	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'JSON'
	}).then(data => {
		let $fileRow = $(`.fileRow[data-id=${id}]`);
		$fileRow.attr('data-subdataloaded', 'true');
		$fileRow.append(`<div id="fileRowContainer${id}" data-id="${id}" class="show-block"></div>`);
		data.forEach(file => {
			let fileFolderClass = file.type.toLowerCase();
			let fileSize = '';
			if (file.size) {
				fileSize = file.size;
			}
			let fileRowHtml = `
				<div data-id="${file._id}" 
					data-parent="${file.parentId}" 
					class="fileRow ${fileFolderClass}">
					<div class="fileName">
						<div class="fileNameText">
							${file.name}
							<span class="addNestedFolder">
								+ Add
							</span>
						</div>
					</div>
					<div class="fileSize">
						${fileSize}
					</div>
					<div class="fileLastMod">
						${file.dateModified}
					</div>
				</div>`;
			$(`#fileRowContainer${id}`).append(fileRowHtml);
		}); //end forEach
	}); //end then
}

function getRootFiles() {
	$.ajax({
		url: '/api/files',
		type: 'GET',
		dataType: 'JSON'
	}).then(data => {
		let $fileRowContainer = $('#fileRowContainer');
		data.forEach(file => {
			let fileFolderClass = file.type.toLowerCase();
			let fileSize = '';
			let subfolderdata = ''; //if folder, to store 
			//if the sub data has been loaded via ajax or not (default false)
			if (file.size) {
				fileSize = file.size;
			}
			if (fileFolderClass === 'folder') {
				subfolderdata = ' data-subdataloaded="false" ';
			} 
			let fileRowHtml = `
				<div data-id="${file._id}" 
					data-parent="${file.parentId}" 
					${subfolderdata}
					class="fileRow ${fileFolderClass}">
					<div class="fileName">
						<div class="fileNameText">
							${file.name}
							<span class="addNestedFolder">
								+ Add
							</span>
						</div>
					</div>
					<div class="fileSize">
						${fileSize}
					</div>
					<div class="fileLastMod">
						${file.dateModified}
					</div>
				</div>`;
			$fileRowContainer.append(fileRowHtml);
		}); //end forEach
	}); //end then
}


/*********CODE*************/

$(document).ready(function() {

	getRootFiles();

})