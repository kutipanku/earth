/**
 * [GET] Get Profession
 * @description Retrieve detailed data of a profession by it's ID
 * @requires id as parameter
 */
export interface GetProfession {}

/**
 * [GET] Get Professions
 * @description Retrieve list of profession
 * @param page as search param
 * @param limit as search param
 * @param name as search param
 * @param slug as search param
 */
export interface GetProfessions {}

/**
 * [GET] Get Profession Options
 * @description Retrieve simpler list of profession based on it's name
 * @param name as search param
 */
export interface GetProfessionOptions {}

/**
 * [POST] Add Profession
 * @description Create new profession according to request body
 */
export interface AddProfession {
  name?: {
    eng?: string;
    ind?: string;
  };
  icon?: string;
  slug?: string;
}

/**
 * [PUT] Edit Profession
 * @description Update profession data according to request body
 * @requires id as parameter
 */
export interface EditProfession {
  name?: {
    eng?: string;
    ind?: string;
  };
  icon?: string;
  slug?: string;
}

/**
 * [DELETE] Remove Profession
 * @description Delete profession by it's ID
 * @requires id as parameter
 */
export interface RemoveProfession {}
