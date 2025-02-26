# Core D-TRO variables
variable "tf_state_bucket" {
  type        = string
  description = "Name of bucket where Terraform stores it's state file."
}

variable "environment" {
  type        = string
  description = "GCP environment to which resources will be deployed."
  default     = "dev"
}

variable "region" {
  type        = string
  description = "GCP region to which resources will be deployed."
  default     = "europe-west1"
}

variable "project_id" {
  type        = string
  description = "GCP project ID to which resources will be deployed."
  default     = "dft-dtro-dev-01"
}

variable "application_name" {
  type        = string
  description = "The name the application."
  default     = "dtro"
}

variable "execution_service_account" {
  type        = string
  description = "Service account for executing GCP applications."
}

variable "artifact_registry_service_ui_image_path" {
  type        = string
  description = "Path of the image in Artifact Registry"
  default     = "europe-west1-docker.pkg.dev/dft-dtro-dev-01/dft-dtro-dev-ui-repository/dft-dtro-ui"
}

variable "service_ui_image" {
  type        = string
  description = "The name of an image being pushed for publish service."
  default     = "dft-dtro-ui"
}

variable "service_ui_tag" {
  type        = string
  description = "The tag of the image to run."
  default     = "latest"
}

variable "dtro_api_url" {
  type        = map(string)
  description = "API url for DTRO"
  default = {
    dev  = "https://dtro-dev.dft.gov.uk/v1"
    test = "https://dtro-test.dft.gov.uk/v1"
    prod = "https://dtro.dft.gov.uk/v1"
  }
}

variable "oauth_gen_url" {
  type        = map(string)
  description = "API url for Oauth Generator"
  default = {
    dev  = "https://dtro-dev.dft.gov.uk/v1/oauth-generator"
    test = "https://dtro-test.dft.gov.uk/v1/oauth-generator"
    prod = "https://dtro.dft.gov.uk/v1/oauth-generator"
  }
}

variable "dtro_version" {
  type        = string
  description = "Version of the D-TRO application"
  default     = "/v1"
}

variable "cloud_run_max_concurrency" {
  type        = string
  description = "Maximum number of requests that each serving instance can receive."
  default     = "50"
}

variable "cloud_run_min_instance_count" {
  type        = string
  description = "Minimum number of serving instances DTRO application should have."
  default     = "1"
}

variable "cloud_run_service_ui_client_id" {
  type        = string
}

variable "cloud_run_service_ui_client_secret" {
  type        = string
}