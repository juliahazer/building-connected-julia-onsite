import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './app'

// This is just an example of using Axios to make an XHR request to our API.
axios.get('/api/files')
	.then(res => res.data)
	.then(files => {
		console.log(files)
	})

ReactDOM.render(<App />, document.getElementById('bc-placeholder'))
