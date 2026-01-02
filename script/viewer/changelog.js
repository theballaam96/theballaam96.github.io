const log_data = [
    { version: "2.8", changes: [
        "Added a changelog",
    ]},
    { version: "2.7", changes: [
        "Added the remainder of color keys",
        "Added an indicator for what kind of shape a marker produces",
        "Changed the color for slide triggers, detransform triggers and camera lock zones",
    ]},
    { version: "2.6", changes: [
        "Added support for displaying color keys",
        "Added support for displaying distant screens and fog",
        "Added phase renderer. This isn't 100% perfect, but is close enough for a first release",
        "Added tracks to markers",
        "Added kong mirror boxes to markers",
        "Added ambient SFX bubbles to markers",
        "Fixed a bug with reading signed 4-byte values",
        "Fixed a bug with rendering IA8 textures",
    ]},
    { version: "2.5", changes: [
        "Added music triggers to markers",
    ]},
    { version: "2.4", changes: [
        "Added voids to markers, which shows both the outer void bounds and the complex voids",
    ]},
    { version: "2.3", changes: [
        "Added WASD controls",
        "Slightly updated the UI",
        "Split version data into separate JS files",
        "Added actor rendering",
        "Added toggle for fluid rendering",
        "Added support for 3-axis rotation with props",
        "Fixed a bug with reading unsigned 4-byte values",
        "Added internal support for reading code/data overlays",
        "Added support for displaying IA4 and IA8 textures",
    ]},
    { version: "2.2", changes: [
        "Added some extra granularity to triggers",
        "Separated used cutscene paths and unused cutscene paths",
        "Added a granular selector for markers",
        "Added toasts",
        "Added a splash screen for first-time visitors"
    ]},
    { version: "2.1", changes: [
        "Added fluid rendering with geometry",
        "Added support for rendering sprites",
        "Added chunks to markers",
        "Added support for converting texture files to an RGBA array",
    ]},
    { version: "2.0", changes: [
        "Added support for rendering props",
        "Fixed the scale for Rotating Room",
        "Showed enemy paths, with a distinction that they're WIP due to the splitting of paths used"
    ]},
    { version: "1.8", changes: [
        "Fixed the scale for DK's house",
        "Added camera paths to markers"
    ]},
    { version: "1.7", changes: [
        "Added support for orthogonal camera",
    ]},
    { version: "1.6", changes: [
        "Added credit for ZeldaBoy14",
        "Converted markers to a multiselect popup",
        "Added enemy fences to markers",
        "Added enemy paths, albeit externally hidden"
    ]},
    { version: "1.5", changes: [
        "Added DAE support",
    ]},
    { version: "1.4", changes: [
        "Added gaps to backdrop rendering, useful for determining ledge clip locations",
    ]},
    { version: "1.3", changes: [
        "Minor UI tweaks",
        "Adjusted infinite-y cylinders to show below the base of the cylinder as well",
        "Added autowalk paths to markers",
        "Added exit nodes & exit autowalk destinations to markers",
    ]},
    { version: "1.2", changes: [
        "Added support for exporting scenes to GLB and OBJ",
    ]},
    { version: "1.1", changes: [
        "Fixed some options not reloading the scene",
        "Handle object position scaling"
    ]},
    { version: "1.0", changes: [
        "Initial update",
    ]},
];