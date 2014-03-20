# Breakpoint Tester Chrome Extension

The Breakpoint Tester chrome extension is used to quickly and easily test the responsiveness of a website at various breakpoints. Breakpoint Tester ships with some sensible default breakpoints but you're more than welcome to define your own custom breakpoints in the extensions settings.

## Installation
TODO: Walk the the installation steps (for installing it manually) and link to the official Chrome Webstore extension page.

## How To Use
TODO: Describe how to use the extension, possibly thow in a few screenshots for clarity.

## Roadmap
- Add an Options/Settings page
- Add custom breakpoints (preferably with names i.e "Nexus S" = { width: xx, height: xx})
- Add ability to change height too (enable/disable in settings)
- Add calculation of width to account for Chrome frame (outer width) so the breakpoint is set accurately. If the breakpoint is 768px it should set the window width slightly larger so the inner/document width is 768px.
- Change up the GUI. Not enough contrast, also the dark theme doesn't mesh well with the default chrome popup border/top caret. Change to a light theme to match the default Chrome theme.
- Generate better icons. They look fine at high resolution (128px) but the smaller they are the worse they look.
- Implement the 'badge' functionality to display the current breakpoint, if any.
- Use the 'active' class when a preset is selected to denote which breakpoint the window is currently set to.
- Lots more I'm sure, just can't remember them right now...

## Changelog
- *3/20/2014* - Initial release. It works but still a lot of work to do (see Roadmap above) before I'll be happy with it.