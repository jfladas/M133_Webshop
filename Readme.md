# Ergänzende Vorlage für Einzelprojekt #
Diese Vorlage zeigt, wie Sie ein Deno-Projekt komplett in TypeScript (Front- und Backend) umsetzen können.
Zudem wird gezeigt, wie Sie mehre Pages per Link miteinander Verknüpfen können (Overview- und Detail- Ansicht).

## Applikations-Start ##
Sie können die Applikation unter Ubuntu durch Ausführen des Start-Scripts starten:
`./start.sh`

Alternativ können Sie die beiden Zeilen des Scripts auch manuell ausführen:

`deno run --allow-read --allow-write --unstable ./tools/builder.ts`

(transpiliert und bundled die Frontend-JavaScript-Datei).

`deno run --allow-net --allow-read ./src/webserver.ts`

(startet den Webserver)

## Applikation aufrufen ##
Nachdem die Applikation gestart wurde, können Sie diese unter `http://localhost:8000` aufrufen