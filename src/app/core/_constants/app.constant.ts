export class AppConst {
	// encryption key
	public static readonly ENC_KEY = "!ServiceGalaxy";

	// API KEY
	public static readonly API_KEY = "1234";

	// numberValidation
	public static readonly NUMBER_WITH_TWO_DECIMAL =
		/^\s*(?=.*[1-9])\d*(?:(\.|\,)\d{1,2})?\s*$/;
	public static readonly NUMBER_WITH_ZERO_AND_TWO_DECIMAL =
		/^\s*(?=.*[0-9])\d*(?:(\.|\,)\d{1,2})?\s*$/;
		//emailValidation
	public static readonly EMAIL_PATTERN = 
		`^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$`;

	public static readonly DATE_FORMAT = `dd MMM YYYY`;
	public static readonly TIME_FORMAT = `shortTime`;
	public static readonly PASSWORD_PATTERN = 
		`(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9\d@$!%*?&].{7,19}`;
	public static readonly MOB_EMAIL_PATTERN = /(^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)|(^\d{10}$)/;
	public static readonly PHONE_PATTERN = /^\d{10}$/;

	public static readonly COUNTRY_CODE='+91';

	// API BASE URL
	// public static readonly API_BASE_URL = environment.API_BASE_URL;

	public static readonly APPLICATION_BASE_URL = window.location.origin;


	
	

	// server HTTP header status code
	public static readonly HTTP_STATUS: HttpStatus = {
		OK: 200,
		SERVER_INTERNAL_ERROR: 500,
		FORBIDDEN: 401,
		IFNOTOK: 201,
		BAD_REQUEST: 400,
		NOT_FOUND: 404,
		NO_CONTENT: 204,
	};
	public static readonly SERVER_CODES = {
		VALIDATION_ERROR: "E103",
	};
	public static readonly ERROR_MESSAGES = {
		IMAGE_DIMENSIONS:
			"Image should have min dimensions {{width}}X{{height}}",
		SERVER_ERROR: "Something went wrong",
	};
	public static STORAGE_KEYS={
		USER_TOKEN:'USER_TOKEN',
		USER_ID:'USER_ID',
		USER_DETAILS:'USER_DETAILS',
		USER_TYPE:'userType'
	};
	public static MAXLENGTH = {
		phoneNumber: 10,
		pinCode: 10,
		name: 35,
	}

}
export interface HttpStatus {
    OK: number;
    IFNOTOK: number;
    NOT_FOUND: number;
    FORBIDDEN: number;
    BAD_REQUEST: number;
    SERVER_INTERNAL_ERROR: number;
    NO_CONTENT: number;
}

export const AppConstant = {
    info: 'Info!',
    success: 'Success!',
    error: 'Oops!',
    errorOccured: 'Something went wrong,Try again later!',
    invalidFile: 'Invalid file format!',
}