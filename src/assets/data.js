export const data = [
  {
    formId: "health_insurance_application",
    title: "Health Insurance Application",
    fields: [
      {
        id: "personal_info",
        label: "Personal Information",
        type: "group",
        fields: [
          {
            id: "first_name",
            label: "First Name",
            type: "text",
            required: true,
          },
          {
            id: "last_name",
            label: "Last Name",
            type: "text",
            required: true,
          },
          {
            id: "dob",
            label: "Date of Birth",
            type: "date",
            required: true,
          },
        ],
      },
      {
        id: "address",
        label: "Address",
        type: "group",
        fields: [
          {
            id: "country",
            label: "Country",
            type: "select",
            options: ["USA", "Canada", "Germany", "France"],
            required: true,
          },
          {
            id: "state",
            label: "State",
            type: "select",
            required: true,
            dynamicOptions: {
              dependsOn: "country",
              endpoint: "/api/getStates",
              method: "GET",
            },
          },
          {
            id: "city",
            label: "City",
            type: "text",
            required: true,
          },
        ],
      },
      {
        id: "health_info",
        label: "Health Information",
        type: "group",
        fields: [
          {
            id: "smoker",
            label: "Do you smoke?",
            type: "radio",
            options: ["Yes", "No"],
            required: true,
          },
          {
            id: "smoking_frequency",
            label: "How often do you smoke?",
            type: "select",
            options: ["Occasionally", "Daily", "Heavy"],
            required: true,
            visibility: {
              dependsOn: "smoker",
              condition: "equals",
              value: "Yes",
            },
          },
        ],
      },
    ],
  },
  {
    formId: "home_insurance_application",
    title: "Home Insurance Application",
    fields: [
      {
        id: "home_owner",
        label: "Are you the homeowner?",
        type: "radio",
        options: ["Yes", "No"],
        required: true,
      },
      {
        id: "property_type",
        label: "Property Type",
        type: "select",
        options: ["House", "Apartment", "Condo"],
        required: true,
      },
      {
        id: "home_value",
        label: "Estimated Home Value (USD)",
        type: "number",
        required: true,
        validation: {
          min: 50000,
          max: 5000000,
        },
      },
      {
        id: "has_security_system",
        label: "Do you have a home security system?",
        type: "radio",
        options: ["Yes", "No"],
        required: true,
      },
      {
        id: "security_system_type",
        label: "Security System Type",
        type: "select",
        options: ["Monitored", "Unmonitored", "Smart Home System"],
        required: true,
        visibility: {
          dependsOn: "has_security_system",
          condition: "equals",
          value: "Yes",
        },
      },
      {
        id: "fire_safety",
        label: "Do you have fire safety measures?",
        type: "checkbox",
        options: ["Smoke Detectors", "Fire Extinguishers", "Sprinkler System"],
        required: true,
      },
      {
        id: "home_address",
        label: "Home Address",
        type: "group",
        fields: [
          {
            id: "street",
            label: "Street Address",
            type: "text",
            required: true,
          },
          {
            id: "city",
            label: "City",
            type: "text",
            required: true,
          },
          {
            id: "state",
            label: "State",
            type: "select",
            required: true,
            dynamicOptions: {
              dependsOn: "country",
              endpoint: "/api/getStates",
              method: "GET",
            },
          },
          {
            id: "zip_code",
            label: "ZIP Code",
            type: "text",
            required: true,
            validation: {
              pattern: "^[0-9]{5}$",
            },
          },
        ],
      },
      {
        id: "insurance_coverage",
        label: "Coverage Type",
        type: "select",
        options: ["Basic", "Comprehensive", "Premium"],
        required: true,
      },
    ],
  },
  {
    formId: "car_insurance_application",
    title: "Car Insurance Application",
    fields: [
      {
        id: "car_owner",
        label: "Are you the primary car owner?",
        type: "radio",
        options: ["Yes", "No"],
        required: true,
      },
      {
        id: "vehicle_info",
        label: "Vehicle Information",
        type: "group",
        fields: [
          {
            id: "car_make",
            label: "Car Make",
            type: "text",
            required: true,
          },
          {
            id: "car_model",
            label: "Car Model",
            type: "text",
            required: true,
          },
          {
            id: "car_year",
            label: "Year of Manufacture",
            type: "number",
            required: true,
            validation: {
              min: 1990,
              max: 2025,
            },
          },
          {
            id: "car_usage",
            label: "How do you use your car?",
            type: "select",
            options: ["Personal", "Commercial", "Rideshare"],
            required: true,
          },
        ],
      },
      {
        id: "driving_record",
        label: "Driving Record",
        type: "group",
        fields: [
          {
            id: "accidents_last_5_years",
            label: "Have you had any accidents in the last 5 years?",
            type: "radio",
            options: ["Yes", "No"],
            required: true,
          },
          {
            id: "accident_count",
            label: "How many accidents?",
            type: "number",
            required: true,
            visibility: {
              dependsOn: "accidents_last_5_years",
              condition: "equals",
              value: "Yes",
            },
          },
          {
            id: "license_suspensions",
            label: "Have you ever had your license suspended?",
            type: "radio",
            options: ["Yes", "No"],
            required: true,
          },
        ],
      },
      {
        id: "insurance_history",
        label: "Previous Insurance Provider",
        type: "select",
        options: ["None", "State Farm", "Geico", "Progressive", "Allstate"],
        required: true,
      },
      {
        id: "desired_coverage",
        label: "Desired Coverage Type",
        type: "select",
        options: ["Liability Only", "Full Coverage", "Comprehensive"],
        required: true,
      },
      {
        id: "roadside_assistance",
        label: "Do you want Roadside Assistance?",
        type: "radio",
        options: ["Yes", "No"],
        required: true,
      },
    ],
  },
];
