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
        case 'dateOfBirth':
            if (!value.trim()) error = 'Date of Birth is required';
            break;
        case 'age':
            if (!value || String(value).trim() === "Age is required") ;
            break;
        case 'nationality':
            if (!value.trim()) error = 'Nationality is required';
            break;
        case 'gender':
            if (!value.trim()) error = 'Gender is required';
            break;
        case 'maritalStatus':
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
        case 'name':
            if (!value.trim()) error = 'Name is required';
            break;
        case 'relationship':
            if (!value.trim()) error = 'Relationship is required';
            break;
        case 'gender':
            if (!value.trim()) error = 'Gender is required';
            break;
        case 'idNumber':
            if (!value.trim()) error = 'ID Number is required';
            break;
        case 'DoB':
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
        // Current Address
        case 'currentAddress.addressLine1':
            if (!value.trim()) error = 'Address Line 1 is required';
            break;
        case 'currentAddress.addressLine2':
            if (!value.trim()) error = 'Address Line 2 is required';
            break;
        case 'currentAddress.country':
            if (!value.trim()) error = 'Country is required';
            break;
        case 'currentAddress.state':
            if (!value.trim()) error = 'State is required';
            break;
        case 'currentAddress.city':
            if (!value.trim()) error = 'City is required';
            break;
        case 'currentAddress.zipCode':
            if (!value.trim()) error = 'Zip Code is required';
            break;

        // Permanent Address
        case 'permanentAddress.addressLine1':
            if (!value.trim()) error = 'Address Line 1 is required';
            break;
        case 'permanentAddress.addressLine2':
            if (!value.trim()) error = 'Address Line 2 is required';
            break;
        case 'permanentAddress.city':
            if (!value.trim()) error = 'City is required';
            break;
        case 'permanentAddress.state':
            if (!value.trim()) error = 'State is required';
            break;
        case 'permanentAddress.country':
            if (!value.trim()) error = 'Country is required';
            break;
        case 'permanentAddress.zipCode':
            if (!value.trim()) error = 'Zip Code is required';
            break;

        // Contact Info
        case 'primaryMobileNo':
            if (!value.trim()) error = 'Primary Phone Number is required';
            break;
        case 'secondaryMobileNo':
            if (!value.trim()) error = 'Alternate Phone Number is required';
            break;
        case 'email':
            if (!value.trim()) error = 'Email Address is required';
            break;

        // Emergency Contact
        case 'relationName':
            if (!value.trim()) error = 'Relation Name is required';
            break;
        case 'relationship':
            if (!value.trim()) error = 'Relationship is required';
            break;
        case 'relationContactNo':
            if (!value.trim()) error = 'Phone Number is required';
            break;
        case 'relationEmail':
            if (!value.trim()) error = 'Email Address is required';
            break;
        case 'relationAddress':
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
        case 'percentage':
            if (!value) error = 'Percentage is required';
            break;
        default:
            break;
    }

    return error;
};

// Certification Validations Error Message

export const certificationValidateField = (name, value) => {
    let error = '';
    switch (name) {
        case 'name':
            if (!value.trim()) error = 'Name is required';
            break;
        case 'issuedBy':
            if (!value.trim()) error = 'Issued By is required';
            break;
        case 'issuedDate':
            if (!value.trim()) error = 'Issue Date is required';
            break;
        case 'additionalInfo':
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

        case 'bloodGroup':
            if (!value.trim()) error = 'Blood Group is required';
            break;

        case 'allergies':
            if (!value.trim()) error = 'Allergy Intolerance is required';
            break;

        case 'preExistingIllnesses':
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

        case 'vaccinationName':
            if (!value.trim()) error = 'Vaccination Name is required';
            break;

        case 'dateofDose':
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
        case 'visaNumber':
            if (!value.trim()) error = 'Visa Number No is required';
            break;

        case 'issuedDate':
            if (!value.trim()) error = 'Issue Date is required';
            break;

        case 'placeOfIssue':
            if (!value.trim()) error = 'Place of Issue is required';
            break;

        case 'expiryDate':
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
        case 'jobTitle':
            if (!value.trim()) error = 'Jobtitle is required';
            break;
        case 'startDate':
            if (!value) error = 'Start Date is required';
            break;
        case 'endDate':
            if (!value) error = 'End Date is required';
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
            if (!value.trim()) error = 'Select Employee Type';
            break;
        // case 'employeeId':
        //     if (!value.trim()) error = 'Employee ID is required';
        //     break;
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

// Manage Holidays Error Message

export const HolidayListValidateField = (name, value) => {
    let error = '';
    switch (name) {
        case 'holidayname':
            if (!value.trim()) error = 'Holiday Name is required';
            break;
        case 'holidaydate':
            if (!value.trim()) error = 'Holiday Date is required';
            break;
        case 'holidayday':
            if (!value.trim()) error = 'Holiday Day is required';
            break;
        case 'restrictedHoliday':
            if (!value.trim()) error = 'Please confirm holiday type.';
            break;
        case 'description':
            if (!value.trim()) error = 'Description is required';
            break;
        default:
            break;
    }

    return error;
};

export const LeaveReportValidateField = (name, value) => {
    let error = '';
    switch (name) {
        case 'leaveName':
            if (!value.trim()) error = 'Leave Name is required';
            break;
        case 'description':
            if (!value.trim()) error = 'Description is required';
            break;
        case 'leaveCategory':
            if (!value.trim()) error = 'Leave Category is required';
            break;
        case 'genderEligibility':
            if (!value.trim()) error = 'Gender Eligibility is required';
            break;
        case 'monthlyAccrual':
            if (!value.trim()) error = 'Monthly Accrual is required';
            break;
        case 'carryForwardAllowed':
            if (!value.trim()) error = 'Carry Forward Allowed is required';
            break;
        case 'maxCarryForward':
            if (!value.trim()) error = 'Max Carry Forward is required';
            break;
        case 'allowHalfDay':
            if (!value) error = 'Allow HalfDay is required';
            break;
        case 'validFrom':
            if (!value) error = 'Valid From is required';
            break;
        case 'validTo':
            if (!value) error = 'Valid To is required';
            break;
        default:
            break;
    }

    return error;
};