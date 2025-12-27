
# Script to run the backend server using the portable Maven
$MavenCmd = "c:\Users\Je--rry\.gemini\tools\apache-maven-3.9.12\bin\mvn.cmd"
Write-Host "Starting Backend Server..."
& $MavenCmd jetty:run
