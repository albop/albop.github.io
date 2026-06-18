#!/bin/bash

# Configuration
PORT=4000
IMAGE="starefossen/github-pages"
CONTAINER_NAME="jekyll-site"

show_help() {
    echo "Usage: ./run_local.sh [command]"
    echo "Commands:"
    echo "  start     Start the Jekyll container in the background"
    echo "  stop      Stop the running Jekyll container"
    echo "  status    Check if the Jekyll container is running"
    echo "  logs      View logs of the running Jekyll container"
    echo "  run       Run the Jekyll container in the foreground (standard docker command)"
    echo "  help      Show this help message"
}

case "$1" in
    start)
        if [ "$(docker ps -q -f name=^/${CONTAINER_NAME}$)" ]; then
            echo "Container '${CONTAINER_NAME}' is already running on port ${PORT}."
        else
            echo "Starting Jekyll container '${CONTAINER_NAME}' in background on port ${PORT}..."
            docker run --name "${CONTAINER_NAME}" -d --rm -v "$PWD":/usr/src/app -p "${PORT}:${PORT}" "${IMAGE}"
            echo "To view logs, run: ./run_local.sh logs"
        fi
        ;;
    stop)
        if [ "$(docker ps -q -f name=^/${CONTAINER_NAME}$)" ]; then
            echo "Stopping Jekyll container '${CONTAINER_NAME}'..."
            docker stop "${CONTAINER_NAME}"
        else
            echo "No container named '${CONTAINER_NAME}' is running."
        fi
        ;;
    status)
        if [ "$(docker ps -q -f name=^/${CONTAINER_NAME}$)" ]; then
            echo "Jekyll container '${CONTAINER_NAME}' is RUNNING."
            docker ps -f name=^/${CONTAINER_NAME}$
        else
            echo "Jekyll container '${CONTAINER_NAME}' is NOT running."
        fi
        ;;
    logs)
        if [ "$(docker ps -a -q -f name=^/${CONTAINER_NAME}$)" ]; then
            docker logs -f "${CONTAINER_NAME}"
        else
            echo "No container named '${CONTAINER_NAME}' exists."
        fi
        ;;
    run|""|serve)
        echo "Running Jekyll container in the foreground on port ${PORT}..."
        docker run -it --rm -v "$PWD":/usr/src/app -p "${PORT}:${PORT}" "${IMAGE}"
        ;;
    *)
        show_help
        ;;
esac
