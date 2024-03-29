const BASEURL = 'https://app-test.organisatie.freepeat.com';
export default {
    GetToken: "https://app-test.organisatie.freepeat.com/token",
    GetUserData: `${BASEURL}/api/users/GetUsers?excludeActiveUsers=false`,
    PostUserData: `${BASEURL}/api/Users`,
    DeleteUserData: `${BASEURL}/api/Users/`,
    GetUserDataById: `${BASEURL}/api/Users/`,
    PostUserUpdate: `${BASEURL}/api/Users`,
    GetMenuItems: `${BASEURL}/api/factory/execute/Builder-Test/getMenuItems`,
    GetGridFunction: `${BASEURL}/api/factory/execute/Builder-Test/getGrids`,
    GetGridColumn: `${BASEURL}/api/factory/execute/Builder-Test/getGridColumns`,
    GetButtonInfo: `${BASEURL}/api/factory/execute/Builder-Test/getButtons`,
    GetFormInfo: `${BASEURL}/api/factory/execute/Builder-Test/getForms`,
    GetFormFileds: `${BASEURL}/api/factory/execute/Builder-Test/getFormfields`,
    GetFormDropdownInfo: `${BASEURL}/api/factory/execute/Builder-Test/getDropdowns`,
  };

  