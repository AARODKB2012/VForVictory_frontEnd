// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  //backendURL: 'https://vfv-backend-service.azurewebsites.net/',
  backendURL: 'http://localhost:3000/',
  passwordResetURL: 'http://localhost:4200/#/pages/reset'
  //passwordResetURL: 'https://vforvictory.azurewebsites.net/#/pages/reset'
};
