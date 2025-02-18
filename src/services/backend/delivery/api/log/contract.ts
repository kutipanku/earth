/**
 * [GET] Get Log
 * @description Retrieve detailed data of an log by it's ID
 */
export interface GetLog {
  request: {
    params: {
      id: string;
    };
    search_params: null;
    body: null;
  };
  response: {
    success: boolean;
    message: string | null;
    data: {
      id: string;
      action: string;
      entity: string;
      data: {
        id: string;
        old: string;
        new: string;
      };
      admin: {
        id: string;
        name: string;
      } | null;
      metadata: {
        created_at: string;
        updated_at: string;
      } | null;
    } | null;
  };
}

/**
 * [GET] Get Logs
 * @description Retrieve list of log
 */
export interface GetLogs {
  request: {
    params: null;
    search_params: {
      page: string | null;
      limit: string | null;
      admin: string | null;
      action: string | null;
      entity: string | null;
    };
    body: null;
  };
  response: {
    success: boolean;
    message: string | null;
    data: {
      list: Array<{
        id: string;
        action: string;
        entity: string;
        data: {
          id: string;
          old: string;
          new: string;
        };
        admin: {
          id: string;
          name: string;
        } | null;
        metadata: {
          created_at: string;
          updated_at: string;
        } | null;
      }>;
      total: number;
    };
  };
}
