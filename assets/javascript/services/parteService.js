//

ParteService.$inject = ['$resource', '$cookies', 'URL_API'];

function ParteService($resource, $cookies, URL_API) {
	// var headers = { 'x-access-token': $cookies.get('token') };
	var headers = { 'content-type':'application/json; charset=utf-8', 'x-access-token': $cookies.get('token') };

	return $resource(URL_API+'/api/parte/:nrocta/:nrofor',
		{
			nrocta: '@nrocta',
			nrofor: '@nrofor'
		},
		{
			get: {
				method: 'GET',
				isArray: false,
				headers: headers
			},
			history: {
				url: URL_API+'/api/parte/:nrocta/:nrofor/history',
				method: 'GET',
				isArray: true,
				headers: headers
			},
			actions: {
				url: URL_API+'/api/parte/:nrocta/:nrofor/actions',
				method: 'GET',
				isArray: true,
				headers: headers
			},
			post: {
				method: 'PUT',
				isArray: true,
				headers: headers
			}
		}
	);
}
