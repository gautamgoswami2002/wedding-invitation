const { execSync } = require('child_process');
const fs = require('fs');

// Create a small helper script that runs inside the real page
// We will test scrolling on http://localhost:3000/
const testRunner = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; background:#000;">
  <script>
    // We can open the real site in an iframe or redirect
    const params = new URLSearchParams(window.location.search);
    const target = params.get('to');
    
    // Redirect to real page with hash, but wait to click seal
  </script>
</body>
</html>
`;

