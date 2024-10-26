# Cloud Engineering Learning Path

This Jekyll site provides a structured learning path with free resources for transitioning into cloud engineering. Follow the modules sequentially to build foundational knowledge and skills.

## Setup Instructions

### Option 1: Local Jekyll Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/mrcloudchase/mrcloudchase.github.io.git
   cd mrcloudchase.github.io
   ```

2. Install Jekyll (if you haven’t already).

3. Serve the site locally:
   ```bash
   bundle exec jekyll serve
   ```

4. Open `http://localhost:4000` in your browser to preview.

### Option 2: Docker Setup (Recommended for Consistency)

If you prefer to avoid installing Jekyll and its dependencies locally, use Docker.

1. Pull the Docker image from Docker Hub:
   ```bash
   docker pull mrcloudchase/cloud-engineering-path:latest
   ```

2. Run the Docker container:
   ```bash
   docker run --rm -p 4000:4000 -v $(pwd):/app mrcloudchase/cloud-engineering-path:latest
   ```

3. Open `http://localhost:4000` in your browser to preview.

> **Note**: Using Docker ensures a consistent environment, avoiding dependency issues.

## Contributing

To contribute:

1. **Optionally**, set up Docker as shown above to ensure a consistent development environment.
2. Add new resources to the appropriate module file or create a new module file in the `modules/` directory.
3. Test your changes locally (with Jekyll or Docker), then submit a pull request.

Thank you for contributing to the Cloud Engineering Learning Path!
