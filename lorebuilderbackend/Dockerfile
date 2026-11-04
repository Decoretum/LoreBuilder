FROM mcr.microsoft.com/dotnet/sdk:9.0.318 AS build

COPY . /source

WORKDIR /source

RUN --mount=type=cache,id=nuget,target=/root/.nuget/packages \
    ARCH="$TARGETARCH" && \
    if [ "$TARGETARCH" = "amd64" ]; then TARGETARCH="x64"; else TARGETARCH="$TARGETARCH"; fi && \
    dotnet publish -a "$ARCH" --use-current-runtime --self-contained false -o /app


FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final

WORKDIR /app

COPY --from=build /app .

ARG UID=10001

RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

USER appuser

ENTRYPOINT ["dotnet", "lorebuilderbackend.dll"]