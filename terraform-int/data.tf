locals {
  name_prefix = "${var.application_name}-${var.integration_prefix}"
}

data "google_project" "project" {}
