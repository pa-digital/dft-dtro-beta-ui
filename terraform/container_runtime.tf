locals {
  Service_ui_cloud_run_service_name = "${local.name_prefix}-${var.service_ui_image}"

  service_ui_envs = merge(
    {
      DEPLOYED       = timestamp()
      PROJECTID      = data.google_project.project.project_id
      BASE_URL       = var.dtro_api_url[var.environment]
      VERSION_URL    = var.dtro_version
      TOKEN_ENDPOINT = var.oauth_gen_url[var.environment]
      CLIENT_ID      = var.cloud_run_service_ui_client_id
      CLIENT_SECRET  = var.cloud_run_service_ui_client_secret
    })

  project_id = data.google_project.project.project_id
}

resource "google_cloud_run_v2_service" "service_portal_service" {
  name     = local.Service_ui_cloud_run_service_name
  location = var.region
  deletion_protection = false
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    service_account = var.execution_service_account

    scaling {
      min_instance_count = 1
      max_instance_count = 2
    }

    containers {
      image = "${var.artifact_registry_service_ui_image_path}:${var.service_ui_tag}"
      ports {
        container_port = 8080
      }

      dynamic "env" {
        for_each = local.service_ui_envs
        content {
          name  = env.key
          value = env.value
        }
      }

      startup_probe {
        timeout_seconds   = 3
        period_seconds    = 15
        failure_threshold = 10
        http_get {
          path = "/health"
          port = 8080
        }
      }

      liveness_probe {
        http_get {
          path = "/health"
          port = 8080
        }
      }
    }
  }
}
