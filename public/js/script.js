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

$('#fileRowContainer').on('click', '.addNestedFolder', e => {
	let $currFileRow = $(e.target).closest('.fileRow')
	let fileId = $currFileRow.attr('data-id');
	let fileParentId = $currFileRow.attr('data-parent');
});

/*********FUNCTIONS*************/

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
			if (file.size) {
				fileSize = file.size;
			}
			let fileRowHtml = `
				<div data-id="${file._id}" 
					data-parent="${file.parentId}" 
					class="fileRow ${fileFolderClass}">
					<div class="fileName">
						${file.name}
						<span class="addNestedFolder">
							+ Add
						</span>
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