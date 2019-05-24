//

LicenciasService.$inject = ['$resource', '$cookies', 'URL_API'];

function LicenciasService($resource, $cookies, URL_API, $params) {

	var info = {},
			headers = {'Content-Type':'application/json; charset=utf-8', 'x-access-token': $cookies.get('token') };

	 info.news = $resource(URL_API+'/api/habilitacion/novedades', {},
			{
				get: {
					method: 'GET',
					isArray: true,
					headers: headers
				}
			}
		);

	 info.types = $resource(URL_API+'/api/habilitacion/tipo_habilitacion', {},
			{
				get: {
					method: 'GET',
					isArray: true,
					headers: headers
				}
			}
		);

	 info.save = $resource(URL_API+'/api/habilitacion', {},
			{
				post: {
					method: 'POST',
					isArray: true,
					headers: headers
				}
			}
		);

	 return info;
}
