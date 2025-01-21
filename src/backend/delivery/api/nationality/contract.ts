/**
 * [GET] Get Nationality
 * @description Retrieve detailed data of a nationality by it's ID
 * @requires id as parameter
 */
export interface GetNationality {}

/**
 * [GET] Get Nationalities
 * @description Retrieve list of nationality
 * @param page as search param
 * @param limit as search param
 * @param name as search param
 * @param slug as search param
 */
export interface GetNationalities {}

/**
 * [GET] Get Nationality options
 * @description Retrieve simpler list of nationality based on it's name
 * @param name as search param
 */
export interface GetNationalityOptions {}

/**
 * [POST] Add Nationality
 * @description Create new nationality according to request body
 */
export interface AddNationality {
  name?: {
    eng?: string;
    ind?: string;
  };
  flag?: string;
  slug?: string;
}

/**
 * [PUT] Edit Nationality
 * @description Update nationality data according to request body
 * @requires id as parameter
 */
export interface EditNationality {
  name?: {
    eng?: string;
    ind?: string;
  };
  flag?: string;
  slug?: string;
}

/**
 * [DELETE] Remove Nationality
 * @description Delete nationality by it's ID
 * @requires id as parameter
 */
export interface RemoveNationality {}
