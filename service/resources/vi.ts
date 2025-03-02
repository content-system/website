export const vi = {
  format_date: "dd/mm/yyyy",
  format_momnent_date: "DD/MM/YYYY, h:mm:ss a",
  language: "Language",
  date_format: "Date Format",

  home: "Home",
  dashboard: "Dashboard",
  settings: "Settings",
  help: "Help",
  events_history: "Event History",
  menu: "Menu",
  sidebar: "Sidebar",
  dark_mode: "Dark mode",
  light_mode: "Light mode",
  default_mode: "Default mode",
  grey_mode: "Grey mode",
  classic_menu: "Classic menu",
  modern_menu: "Modern menu",

  read: "Read",
  write: "Write",
  delete: "Delete",
  approve: "Approve",
  reject: "Reject",
  confirm: "Confirm",
  submit: "Submit",
  create: "Create",
  add: "Add",
  edit: "Edit",
  reset: "Reset",
  search: "Search",
  save: "Save",
  cancel: "Cancel",
  close: "Close",
  select: "Select",
  deselect: "Deselect",
  check_all: "Check All",
  uncheck_all: "Uncheck All",
  yes: "Yes",
  no: "No",

  msg_confirm_back: "Data has been changed. Your changes will be lost if you do not save them. Are you sure you want to go back?",
  msg_approve_success: "Data have been approved successfully",
  msg_approve_error: "Cannot approve. Internal server error.",
  msg_reject_success: "Data have been rejected successfully",
  msg_reject_error: "Cannot reject. Internal server error.",
  msg_approve_version_error: "Data have been approved or rejected. Please refresh screen and try again.",
  msg_confirm_delete: "Are you sure you want to delete?",
  msg_delete_confirm_in_list: "Are you sure to delete {0} ?",
  msg_delete_failed: "This item was not deleted successfully",
  msg_no_change: "You do not change anything.",
  msg_delete_confirm: "Are you sure to delete this item?",
  msg_delete_items_confirm: "Are you sure to delete selected items?",

  msg_no_data_found: "No data found.",
  msg_search_result_sequence: "Items {0} to {1}.",
  msg_search_result_page_sequence: "Items {0} to {1} of {2}. Page {3} of {4}.",
  page_size: "Page Size",
  search_type: "Search Type",
  duration: "Duration",
  order: "Order",
  sort: "Sort",
  sort_relevance: "Relevance",
  sort_date: "Date",
  sort_rating: "Rank",

  header_confirm: "Confirm",
  header_error: "Error",
  header_warning: "Warning",
  header_info: "Info",
  header_success: "Success",
  button_ok: "",
  button_yes: "Yes",
  button_no: "No",
  button_home: "Home",

  msg_confirm_save: "Are you sure you want to save?",
  msg_save_success: "Data have been saved successfully.",

  error_undefined: "{0} is not allowed to exist.",
  error_exp: "{0} does not match the regular expression.",
  error_type: "Invalid datatype. Type of {0} cannot be {1}.",

  error_boolean: "{0} cannot be boolean.",
  error_strings: "{0} must be an string array.",
  error_numbers: "{0} must be an number array.",
  error_integers: "{0} must be an number array.",
  error_datetimes: "{0} must be an date time array.",
  error_dates: "{0} must be an date array.",

  error_required: "{0} is required.",
  error_minlength: "{0} cannot be less than {1} characters.",
  error_maxlength: "{0} cannot be greater than {1} characters.",

  error_email: "{0} is not a valid email address.",
  error_integer: "{0} is not a valid integer.",
  error_number: "{0} is not a valid number.",
  error_precision: "{0} has a valid precision. Precision must be less than or equal to {1}",
  error_scale: "{0} has a valid scale. Scale must be less than or equal to {1}",
  error_phone: "{0} is not a valid phone number.",
  error_fax: "{0} is not a valid fax number.",
  error_url: "{0} is not a valid URL.",
  error_ipv4: "{0} is not a valid ipv4.",
  error_ipv6: "{0} is not a valid ipv6.",
  error_digit: "{0} must contain digits only.",
  error_dash_digit: "{0} must contain digits and dash only.",
  error_code: "{0} must contain characters and digits only.",
  error_dash_code: "{0} must contain characters and digits and dash only.",
  error_routing_number: "{0} is not a valid routing number.",
  error_check_number: "{0} is not a valid check number.",
  error_post_code: "{0} is not a valid post code.",
  error_ca_post_code: "{0} is not a valid Canada post code.",
  error_us_post_code: "{0} is not a valid US post code.",

  error_min: "{0} must be greater than or equal to {1}.",
  error_max: "{0} must be less than or equal to {1}.",
  error_gt: "{0} must be greater than {1}.",
  error_lt: "{0} must be less than {1}.",
  error_equal: "{0} must be equal to {1}.",
  error_date: "{0} is not a valid date.",
  error_min_date: "{0} cannot be before {1}.",
  error_max_date: "{0} cannot be after {1}.",
  error_from_now: "{0} must be after now.",
  error_from_tomorrow: "{0} must be from tomorrow.",
  error_from: "{0} must be after {1}.",
  error_after_now: "{0} cannot be after now.",
  error_after_tomorrow: "{0} cannot be after tomorrow.",
  error_after: "{0} cannot be after {1}.",

  error_400: "The server will not process the request due to the malformed request syntax.",
  error_409: "Request could not be processed because of conflict in the current state of the resource.",
  error_submit_failed: "Failed to submit data.",
  error_submitting_form: "An error occurred while submitting the form.",

  error_not_found: "Not found.",
  error_internal: "System Error.",
  error_system_error: "System Error.",
  error_invalid: "You have inserted invalid {0}. Please try again",
  error_required_minlength: "{0} is required and {0} cannot be less than {1} characters.",
  error_range: "{0} is not in the range {1} through {2}.",
  error_byte: "{0} must be a byte.",
  error_short: "{0} must be a short.",
  error_long: "{0} must be a long.",
  error_float: "{0} must be a float.",
  error_double: "{0} must be a double.",

  error_required_number: "{0} is required and must be a number",
  error_required_email: "{0} is required and must be a valid email address.",
  error_cash: "Please enter a valid amount money.",
  error_credit_card: "{0} is a valid credit card",
  error_port: "Invalid Port (min. 0, max. 65535)",
  error_password:
    "Your new password is invalid. The password length must be between 8 and 14 characters, and no dictionary words permitted. Also, your password must contain at least 3 out of 4 following rules: lowercase, uppercase, numerals, special characters such as !@#$%^&*(){}[].",
  error_account_number: "{0} is not a valid checking account number.",

  error_item_exist: "This {0} is already existed in the system. Please try a different one",
  error_item_not_exist: "This {0} does not exist in the system. Please try a different one",

  error_network: "Cannot access server. Maybe network is corrupted.",
  error_500: "Internal Server error",
  error_502: "Bad Gateway",
  error_503: "Service Unavailable",
  error_504: "Gateway Timeout",

  error_401: "You have not logged in or the session was expired. Please log in." /* error_unauthorized */,
  error_404: "Item was not found." /* error_not_found  */,
  error_403: "You do not have permission for this page or for this action." /* error_forbidden */,

  error_404_title: "404 Not found",
  error_404_message: "Sorry, the page you are looking for could not be found.",
  error_500_title: "500 Internal Server Error",
  error_500_message: "Sorry, the server is wrong. Please try again later.",

  error_version: "Data has been changed by someone. Please refresh screen and continue.",
  error_data_corrupt: "Data has been corrupt. You cannot proceed this business.",
  error_required_id: "You must input id.",
  error_duplicate_key: "The id is duplicated.",
  error_duplicated: "{0} is duplicated.",

  error_permission: "Permission error",
  error_permission_search: "You do not permission to use this page.",
  error_permission_view: "You do not permission to use this page.",
  error_permission_add: 'You do not have "add" permission. You are not allowed to "add".',
  error_permission_edit: 'You do not have "add" permission. You are not allowed to "edit".',
  error_permission_delete: 'You do not have "add" permission. You are not allowed to "delete".',

  true: "True",
  false: "False",

  status: "Status",
  active: "Active",
  inactive: "Inactive",

  please_select: "Please Select",

  address: "Address",
  street: "Street",
  ward: "Ward",
  district: "District",
  city: "City",
  county: "County",
  prefecture: "Prefecture",
  state: "State",
  country: "Quốc gia",
  postcode: "Postal Code",

  gender: "Gender",
  male: "Male",
  female: "Female",
  name: "Name",

  fullname: "Tên",
  email: "Email",
  phone: "Số điện thoại",
  notification: "Notification",
  first_name: "First Name",
  last_name: "Last Name",
  middle_name: "Middle Name",
  display_name: "Display Name",
  person_title: "Title",

  from: "From",
  to: "To",
  field: "Field",
  error: "Error",
  info: "Info",
  warning: "Warning",

  keyword: "Keyword",
  remark: "Remark",
  all: "All",
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  detail: "Detail",
  description: "Description",
  sequence: "No.",
  total: "Total",

  start_date: "Start Date",
  end_date: "End Date",
  start_time: "Start Time",
  end_time: "End Time",

  action: "Action",
  resource: "Resource",
  timestamp: "Timestamp",
  ip: "IP",

  news: "News",
  jobs: "Jobs",
  id: "Id",
  title: "Title",
  content: "Content",
  published_at: "Published At",
  published_at_from: "Xuất bản từ lúc",
  published_at_to: "Xuất bản đến lúc",
  company: "Công ty",
  job_title: "Chức danh",
  requirements: "Requirements",
  quantity: "Quantity",

  contacts: "Contacts",
  submitted_at: "Submitted At",
  contacted_by: "Contacted By",
  contacted_at: "Contacted At",
  message: "Message",
}
