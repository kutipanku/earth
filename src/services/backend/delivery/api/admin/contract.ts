/**
 * [GET] Get Admin
 * @description Retrieve detailed data of an admin by it's email
 */
export interface GetAdmin {
  request: {
    params: {
      email: string;
    };
    search_params: null;
    body: null;
  };
  response: {
    success: boolean;
    message: string | null;
    data: {
      id: string;
      name: string;
      email: string;
    } | null;
  };
}

/**
 * [GET] Get Admins
 * @description Retrieve list of admin
 */
export interface GetAdmins {
  request: {
    params: null;
    search_params: {
      page: string | null;
      limit: string | null;
      name: string | null;
    };
    body: null;
  };
  response: {
    success: boolean;
    message: string | null;
    data: {
      list: Array<{
        id: string;
        name: string;
        email: string;
      }>;
      total: number;
    };
  };
}
