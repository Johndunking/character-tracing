function startTracing(type) {
    // Set the chosen character type
    characterType = type;

    // Redirect to the tracing page with the selected character type
    window.location.href = `tracing.html?type=${type}`;
}