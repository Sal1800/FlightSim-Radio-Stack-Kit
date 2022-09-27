# FlightSim-Radio-Stack-Kit
Avionics stack for MSFS aircraft developers

### Contains:
Blender file (compatible with 2.9+) with textured and animated models of these avionics:
- KX-165A Nav/Com Tranceiver (separate models for radio index 1 and 2)
- KN-62A DME receiver
- KR-87 ADF receiver
- KT-76C Transponder

Texture directory with albedo, emissive and normal maps (PNG files)

Inkscape format SVG vector source file for the textures

Sample_model_behaviors.xml with the model behavior code needed for mouse events and animation

PANEL.CFG with the VCockpit configurations

Packaged addon for the KN-62 DME HTML files. 

Project files and source for the KN-62

### Requirements:
MSFS GTLF exporter plugin

---
## Getting Started
Feel free to open the Blender file and examine the contents. This will give you an idea about the structure and naming convention. 

### Importing models
When you are ready to import any of these models into your project, you can close it and open your aircraft model file. 
1. First select the collection you wish to have the new object(s).
2. Select File -> Append... and browse to the radio stack Blender file.
3. Select Collections to see all of the individual instruments plus the Avionics collection which contains everything.
4. After the collection(s) have been imported, select only the root objects to move them into position. You can scale and rotate the root objects and the child animations will stay intact.

**IMPORTANT: The names of the objects and animations cannot be altered as they correspond to the model behavior code. If you happen to have an object or animation with a the same name, Blender will rename one of them. If you encounter any issues, check the names.**

An indication that Blender has renamed an object is if it has a suffix at the end. Example: COM_Knob_OnOff_1 can get renamed to COM_Knob_OnOff_1.001


### Configuring the model behaviors
If you already have a model behavior file, you can copy from the Sample_model_behaviors.xml file into yours. The important pieces to copy are the Includes and the specific iunstrument behavior code. 
These are the required Includes:
```
<Include ModelBehaviorFile="Asobo\Common.xml"/>
<Include ModelBehaviorFile="Asobo\Generic.xml"/>
<Include ModelBehaviorFile="Asobo\NAVCOM\NavComSystem.xml"/>	
<Include ModelBehaviorFile="Asobo\Transponder\Transponder.xml"/>
<Include ModelBehaviorFile="Asobo\NAVCOM\ADF.xml"/>	
```
### Configuring the PANEL.CFG
This step configures the textures for the instrument screens which use the HTML UI system. Each instrument needs a VCockpit section that sets the texture name, dimensions and which HTML file will be used. Here is an example for the Nav/Com 1 radio.
```
[Vcockpit03]
size_mm				= 512,62
pixel_size			= 512,62
texture				= $NavCom1_Screen
background_color	= 42,42,40
htmlgauge00=Generic/Radios/KX155A/KX155A.html?Index=1,	0,  0, 512, 62
```

### Custom KN 62 DME HTML
All of the other instruments use the base Asobo HTML files that come with the flight sim. The KN 62 is custom and will need to be injected into the Virtual File System to be available. 

There are two ways to do this. If you just want to use it as-is, Copy the package from the included Community directory into your sim's Community directory. 

If you want to extend or customize, you will need to add an asset group into your PackageDefinitions XML. This will use the source files in PackageSources.
```
<AssetGroup Name="Bendix_htmlui">
  <Type>Copy</Type>
  <Flags>
    <FSXCompatibility>false</FSXCompatibility>
  </Flags>
  <AssetDir>PackageSources\html_ui_Bendix_Stack\</AssetDir>
  <OutputDir>html_ui\Pages\VCockpit\Instruments\html_ui_Bendix_Stack\</OutputDir>
 </AssetGroup>
```

### Notes:
- These instruments do not necessarily simulate all the features of the real-world counterparts. But they should be useful for flight simulation.
- The electrical circuits have been simplified so it should only require battery power and in some cases an avionics circuit. They can be made to work with more complex circuits in case you need to turn them on and off individually.
- The emissive texture is included but not applied. There are a few extra steps to be able to control the night lighting but this can be added.
- You can model different models and brands of radios using this as a base, as long as you maintain the names of the objects and animations.

**These are simulated instruments and are not intended for real world training or reference.**

### License:
You are free to use elements of this project for any purpose, including commercial work. It would be nice to maintain the attribution but not required. 

No claims are made regarding the logos and trade dress, which are owned by the manufacturer and included only for demonstration purposes.
