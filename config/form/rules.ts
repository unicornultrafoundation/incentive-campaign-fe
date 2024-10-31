// Define number
export const CREATE_NAME = 25;
export const DESCRIPTION = 256;

export const updatePercent = {
  addr: {
    required: 'Address is required',
  },
};

export const inputNodeRules = {
  numberNode: {
    required: 'Number of nodes is required',
    validate: (value: number) => {
      if (isNaN(value)) {
        return 'Please enter a valid number';
      }
      if (value <= 0) {
        return 'Number of nodes must be greater than zero';
      }
      return true;
    },
    min: {
      value: 1,
      message: 'Number of nodes must be at least 1',
    },
    pattern: {
      value: /^[0-9]+$/, // Only allows numbers
      message: 'Only numeric values are allowed',
    },
  },
};
// Mint Avatar
const rules = {
  updatePercent,
};

export default rules;

export const uploadFileRules = {
  uploadFile: {
    validate: {
      required: (v: File | undefined) =>
        v && v.size > 0 ? true : 'File is required',
      excel: (v: File | undefined) => {
        if (v && v.size > 0) {
          const fileExtension = v.name.split('.').pop()?.toLowerCase();
          if (['xls', 'xlsx'].includes(fileExtension || '')) {
            return true;
          }
          return 'File must be an Excel (.xls or .xlsx) file';
        }
        return 'Excel file is required';
      },
    },
  },
};
