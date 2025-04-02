locals {
  name_prefix = "${var.application_name}-${var.integration_prefix}-${var.environment}"
}

data "google_project" "project" {}
