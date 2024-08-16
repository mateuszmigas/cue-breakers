# Define build arguments for Rust version and application name
ARG RUST_VERSION=1.80.1
ARG APP_NAME=api

# Start a new build stage using the specified Rust version on Alpine Linux
FROM rust:${RUST_VERSION}-alpine AS build-api
ARG APP_NAME
WORKDIR /app

# Install necessary packages for building the Rust application
RUN apk add --no-cache clang lld musl-dev git

# Bind mount the source code and cache directories, then build the application
RUN --mount=type=bind,source=apps/api,target=apps/api \
    --mount=type=bind,source=libs,target=libs \
    --mount=type=bind,source=Cargo.toml,target=Cargo.toml \
    --mount=type=bind,source=Cargo.lock,target=Cargo.lock \
    --mount=type=cache,target=/app/target/ \
    --mount=type=cache,target=/usr/local/cargo/git/db \
    --mount=type=cache,target=/usr/local/cargo/registry/ \
    cargo build --locked --release && \
    # Copy the built executable to a known location
    cp ./target/release/$APP_NAME /bin/server

# Build frontend
FROM node:20-slim AS build-web

# Set up pnpm environment
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Enable corepack
RUN corepack enable

# Copy the application files
COPY apps/web /app

# Set working directory
WORKDIR /app

# Install dependencies and build the app
RUN pnpm install --frozen-lockfile
RUN pnpm run build

# Start a new stage for the final image using Alpine Linux
FROM alpine:3.18 AS final

# Define a build argument for the user ID
ARG UID=10001
# Create a new user with the specified UID and no password, home directory, or login shell
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser
# Switch to the newly created user
USER appuser

# Copy the executable from the build stage to the final image
COPY --from=build-api /bin/server /bin/
COPY --from=build-web /app/dist /bin/web

# Expose the port that the application listens on
EXPOSE 3010

# Define the command to run when the container starts
CMD ["/bin/server"]