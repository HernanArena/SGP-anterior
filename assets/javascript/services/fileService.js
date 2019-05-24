//

FileService.$inject = ['$resource', '$cookies', 'URL_API'];

function FileService($resource, $cookies, URL_API) {
	var info = {},
			headers = { 'x-access-token': $cookies.get('token') };

	info.news = $resource(URL_API+'/api/novedades', {},
			{
				get: {
					method: 'GET',
					isArray: true,
					headers: headers
				}
			}
		);

	info.documents = $resource(URL_API+'/api/documentos', {},
			{
				get: {
					method: 'GET',
					isArray: true,
					headers: headers
				}
			}
		);

	info.contacts = $resource('/api/contactos', {},
			{
				get: {
					method: 'GET',
					isArray: true,
					headers: headers
				}
			}
		);

	info.intercambioarchivos = $resource('/api/intercambioarchivos', {},
			{
				get: {
					method: 'GET',
					isArray: true,
					headers: headers
				}
			}
		);

	info.intercambioarchivosdelete = $resource('/api/intercambioarchivos/:file',
			{
				file: '@file'
			},
			{
				delete: {
					method: 'DELETE',
					isArray: true,
					headers: headers
				}
			}
		);

	return info;
}
