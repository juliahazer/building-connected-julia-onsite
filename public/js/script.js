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
		console.log(data);
	})

})


/*********FUNCTIONS*************/

function getRootFiles() {
	$.ajax({
		url: '/api/files',
		type: 'GET',
		dataType: 'JSON'
	}).then(data => {
		console.log(data);
	});
}


/*********CODE*************/

$(document).ready(function() {

	getRootFiles();

})