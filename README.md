<div align="center">

<img alt="Pixel Sort icon" width="128" height="128" align="center" src=".github/icon.png"/>

# Pixel Sort

**Liven your photos with a glitch effect**

[![check status](https://badgen.net/github/checks/evelynhathaway/pixel-sort/main?icon=github)](https://github.com/evelynhathaway/pixel-sort/actions)
[![license: MIT](https://badgen.net/badge/license/MIT/blue)](/LICENSE)

</div>

## Description

Sort pixels in an image by certain the properties of each pixel to smear a nice glitch effect over your photos.

This pixel sorting project is an Next.js application with offscreen canvas support.

## Features

- Vertical and horizontal directions
- Sort by pixel properties
  - Hue
  - Saturation
  - Lightness
  - Red, Green, Blue, Alpha
  - RGB, RGBA Summation
- Offscreen canvas support

## Examples

![Seattle skyline at night with glitch effect](examples/sorted-seattle.jpg)

![Trees in a forest with glitch effect](examples/sorted-forest.png)

## Screenshots

| Light Mode                                                                           | Dark Mode                                                                          |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| ![Screenshot of the homepage in light mode](.github/screenshot-home-light.png)       | ![Screenshot of the homepage in dark mode](.github/screenshot-home-dark.png)       |
| ![Photograph of a fox being sorted in light mode](.github/screenshot-sort-light.png) | ![Photograph of a fox being sorted in dark mode](.github/screenshot-sort-dark.png) |

## Usage

```bash
git clone git@github.com:evelynhathaway/pixel-sort.git
cd pixel-sort
npm clean-install
npm dev
```

## License

Copyright Evelyn Hathaway, [MIT License](/LICENSE)
