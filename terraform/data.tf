locals {
  name_prefix = "${var.application_name}-${var.environment}"
}

data "google_project" "project" {}
