// Basci Validations Error Message

export const basicValidateField = (name, value) => {
    let error = '';
    switch (name) {
        case 'firstName':
            if (!value.trim()) error = 'First Name is required';
            break;
        case 'lastName':
            if (!value.trim()) error = 'Last Name is required';
            break;
        case 'dob':
            if (!value.trim()) error = 'Date of Birth is required';
            break;
        case 'age':
            if (!value.trim()) error = 'Age is required';
            break;
        case 'nationality':
            if (!value.trim()) error = 'Nationality is required';
            break;
        case 'gender':
            if (!value.trim()) error = 'Gender is required';
            break;
        case 'maritalstatus':
            if (!value.trim()) error = 'Marital Status is required';
            break;
        case 'dateofmarriage':
            if (!value.trim()) error = 'Date of Marriage is required';
            break;
        default:
            break;
    }

    return error;
};

// Benefits Validations Error Message

export const benefitsValidateField = (name, value) => {
    let error = '';
    switch (name) {
        case 'dname':
            if (!value.trim()) error = 'Name is required';
            break;
        case 'relationship':
            if (!value.trim()) error = 'Relationship is required';
            break;
        case 'gender':
            if (!value.trim()) error = 'Gender is required';
            break;
        case 'idnumber':
            if (!value.trim()) error = 'ID Number is required';
            break;
        case 'dob':
            if (!value.trim()) error = 'Date of Birth is required';
            break;

        default:
            break;
    }

    return error;
};

// Contact Validations Error Message

export const contactValidateField = (name, value) => {
    let error = '';
    switch (name) {
        case 'address1':
        case 'paddress1':
            if (!value.trim()) error = 'Address is required';
            break;

        case 'address2':
        case 'paddress2':
            if (!value.trim()) error = 'Address is required';
            break;

        case 'country':
        case 'pcountry':
            if (!value.trim()) error = 'Country is required';
            break;

        case 'state':
        case 'pstate':
            if (!value.trim()) error = 'Date of Birth is required';
            break;

        case 'city':
        case 'pcity':
            if (!value.trim()) error = 'City is required';
            break;

        case 'zipCode':
        case 'pzipCode':
            if (!value.trim()) error = 'ZipCode is required';
            break;

        case 'cdpphonenumber':
            if (!value.trim()) error = 'Primary Phone Number is required';
            break;

        case 'cdaphonenumber':
            if (!value.trim()) error = 'Alternate Phone Number is required';
            break;

        case 'cdemailaddress':
            if (!value.trim()) error = 'Email Address is required';
            break;

        case 'ecdrelationname':
            if (!value.trim()) error = 'Relation Name is required';
            break;

        case 'ecdrelationship':
            if (!value.trim()) error = 'Relationship is required';
            break;

        case 'ecdphonenumber':
            if (!value.trim()) error = 'Phone Number is required';
            break;

        case 'ecdemailaddress':
            if (!value.trim()) error = 'Email Address is required';
            break;

        case 'ecdAddress':
            if (!value.trim()) error = 'Address is required';
            break;

        default:
            break;
    }

    return error;
};

// Education Validations Error Message

export const educationValidateField = (name, value) => {
    let error = '';
    switch (name) {
        case 'degree':
            if (!value.trim()) error = 'Degree is required';
            break;
        case 'major':
            if (!value.trim()) error = 'Major is required';
            break;
        case 'university':
            if (!value.trim()) error = 'University is required';
            break;
        case 'year':
            if (!value.trim()) error = 'Year is required';
            break;
        case 'education':
            if (!value.trim()) error = 'Education is required';
            break;
        case 'CGPA':
            if (!value.trim()) error = 'CGPA is required';
            break;
        case 'cname':
            if (!value.trim()) error = 'Name is required';
            break;
        case 'issuedby':
            if (!value.trim()) error = 'Issued By is required';
            break;
        case 'issuedate':
            if (!value.trim()) error = 'Issue Date is required';
            break;
        case 'expirydate':
            if (!value.trim()) error = 'Expiry Date is required';
            break;
        case 'additionalinformation':
            if (!value.trim()) error = 'Additional Information is required';
            break;
        default:
            break;
    }

    return error;
};

// Family Validations Error Message

export const familyValidateField = (name, value) => {
    let error = '';
    switch (name) {
        case 'fname':
            if (!value.trim()) error = 'First Name is required';
            break;
        case 'lname':
            if (!value.trim()) error = 'Last Name is required';
            break;
        case 'relationship':
            if (!value.trim()) error = 'Relationship is required';
            break;
        case 'dob':
            if (!value.trim()) error = 'Date of Birth is required';
            break;
        case 'education':
            if (!value.trim()) error = 'Education is required';
            break;
        case 'occupation':
            if (!value.trim()) error = 'Occupation is required';
            break;
        default:
            break;
    }

    return error;
};

// Health Validations Error Message

export const healthValidateField = (name, value) => {
    let error = '';
    switch (name) {

        case 'bloodgroup':
            if (!value.trim()) error = 'Blood Group is required';
            break;

        case 'blooddonor':
            if (!value.trim()) error = 'Blood Donor is required';
            break;

        case 'allergyintolerance':
            if (!value.trim()) error = 'Allergy Intolerance is required';
            break;

        case 'preexisting':
            if (!value.trim()) error = 'Pre Existing is required';
            break;

        default:
            break;
    }

    return error;
};

// Vaccination Validations Error Message

export const vaccinationValidateField = (name, value) => {
    let error = '';
    switch (name) {

        case 'vaccinationname':
            if (!value.trim()) error = 'Vaccination Name is required';
            break;

        case 'dateofdose':
            if (!value.trim()) error = 'Date of Dose is required';
            break;

        default:
            break;
    }

    return error;
};

// Passport Validations Error Message

export const passportValidateField = (name, value) => {
    let error = '';
    switch (name) {
        case 'passportno':
            if (!value.trim()) error = 'Passport Number is required';
            break;

        case 'issuedby':
            if (!value.trim()) error = 'Issue By is required';
            break;

        case 'dateofissue':
            if (!value.trim()) error = 'Date of Issue is required';
            break;

        case 'dateexpiry':
            if (!value.trim()) error = 'Expiry Date is required';
            break;

        default:
            break;
    }

    return error;
};

// Visa Validations Error Message

export const visaValidateField = (name, value) => {
    let error = '';
    switch (name) {
        case 'visanumber':
            if (!value.trim()) error = 'Visa Number No is required';
            break;

        case 'issueddate':
            if (!value.trim()) error = 'Issue Date is required';
            break;

        case 'placeofissue':
            if (!value.trim()) error = 'Place of Issue is required';
            break;

        case 'expirydate':
            if (!value.trim()) error = 'Expiry Date is required';
            break;

        case 'notes':
            if (!value.trim()) error = 'Notes is required';
            break;

        default:
            break;
    }

    return error;
};

// Visa Validations Error Message

export const workExperienceValidateField = (name, value) => {
    let error = '';
    switch (name) {
        case 'organization':
            if (!value.trim()) error = 'Organization is required';
            break;
        case 'location':
            if (!value.trim()) error = 'Location is required';
            break;
        case 'jobtitle':
            if (!value.trim()) error = 'Jobtitle is required';
            break;
        case 'startdate':
            if (!value.trim()) error = 'Start Date is required';
            break;
        case 'enddate':
            if (!value.trim()) error = 'End Date is required';
            break;
        default:
            break;
    }

    return error;
};

// Add Employee Error Message

export const addEmployeeValidateField = (name, value) => {
    let error = '';
    switch (name) {
        case 'userType':
            if (!value.trim()) error = 'Employee ID is required';
            break;
        case 'employeeId':
            if (!value.trim()) error = 'Employee ID is required';
            break;
        case 'firstName':
            if (!value.trim()) error = 'First Name is required';
            break;
        case 'lastName':
            if (!value.trim()) error = 'Last Name is required';
            break;
        case 'email':
            if (!value.trim()) error = 'Email Address is required';
            break;
        case 'phoneNumber':
            if (!value.trim()) error = 'Phone Number is required';
            break;
        case 'designation':
            if (!value.trim()) error = 'Designation is required';
            break;
        case 'department':
            if (!value.trim()) error = 'Department is required';
            break;
        case 'joiningDate':
            if (!value.trim()) error = 'Joining Date is required';
            break;
        case 'employmentType':
            if (!value.trim()) error = 'Employment Type is required';
            break;
        case 'workLocation':
            if (!value.trim()) error = 'Work Location is required';
            break;                              
        default:
            break;
    }

    return error;
};

// organization profile Error Message

export const organizationvalidateField = (name, value) => {
    let error = '';

    switch (name) {
        case 'organizationName':
            if (!value.trim()) error = 'Organization Name is required';
            break;

        case 'industry':
            if (!value.trim()) error = 'Industry is required';
            break;

        case 'businessType':
            if (!value.trim()) error = 'Business Type is required';
            break;

        case 'companyAddress':
            if (!value.trim()) error = 'Company Address is required';
            break;

        case 'street':
            if (!value.trim()) error = 'Street is required';
            break;

        case 'city':
            if (!value.trim()) error = 'City is required';
            break;

        case 'state':
            if (!value.trim()) error = 'State is required';
            break;

        case 'zipCode':
            if (!value.trim()) error = 'Zip Code is required';
            else if (!/^\d{4,10}$/.test(value)) error = 'Invalid Zip Code';
            break;

        case 'country':
            if (!value.trim()) error = 'Country is required';
            break;

        case 'phoneNumber':
            if (!value.trim()) error = 'Phone number is required';
            // Indian mobile number: 10 digits, starts with 6-9
            else if (!/^[6-9]\d{9}$/.test(value)) error = 'Invalid Indian mobile number';
            break;

        case 'faxNumber':
            if (!value.trim()) error = 'Fax number is required';
            else if (value && !/^[\d\s()+-]+$/.test(value)) error = 'Invalid fax number';
            break;

        case 'website':
            if (!value.trim()) error = 'Website URL is required';
            else if (value && !/^(https?:\/\/)?[\w.-]+\.[a-z]{2,}$/.test(value)) error = 'Invalid website URL';
            break;

        case 'fiscal':
            if (!value.trim()) error = 'Fiscal year is required';
            break;

        case 'taxMethod':
            if (!value.trim()) error = 'Tax Basis is required ';
            break;

        case 'timeZone':
            if (!value.trim()) error = 'Time zone is required';
            break;

        case 'dateFormat':
            if (!value.trim()) error = 'Date format is required';
            break;

        case 'companyID':
            if (!value.trim()) error = 'Company ID is required';
            break;

        case 'taxID':
            if (!value.trim()) error = 'Tax ID is required';
            break;

        default:
            break;
    }

    return error;
};