export const Auth0Config = {
  // clientID = 'ktx6DLxS8Esku3UpHYzUmuEpNoYXLG6V';
  clientID: '3D3UH75QbCFV1dioTbsR1XeHLvBlyaoZ',
  domain: 'thoughtdesign.au.auth0.com',
  responseType: 'token id_token',
  audience: 'https://thoughtdesign.au.auth0.com/userinfo',
  redirectUri:
    location.protocol +
    '//' +
    location.hostname +
    (location.port ? ':' + location.port : '') +
    '/callback',
  scope: 'profile email openid',
  authConnectionType: 'Username-Password-Authentication'
};
