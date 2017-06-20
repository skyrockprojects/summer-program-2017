{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 7,
			"minor" : 3,
			"revision" : 4,
			"architecture" : "x86",
			"modernui" : 1
		}
,
		"rect" : [ 529.0, 121.0, 927.0, 934.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"boxes" : [ 			{
				"box" : 				{
					"bgcolor" : [ 0.936553, 0.9512, 0.726506, 0.71 ],
					"fontface" : 0,
					"id" : "obj-33",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 41.0, 39.0, 554.0, 20.0 ],
					"style" : "",
					"text" : "OSC msg from FaceDetection CV"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.495624, 0.529709, 0.636972, 0.26 ],
					"id" : "obj-32",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 42.5, 222.0, 213.0, 33.0 ],
					"style" : "",
					"text" : "get x , y coordinations then we can do something by those two values"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.936553, 0.9512, 0.726506, 0.71 ],
					"fontface" : 0,
					"id" : "obj-31",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 132.5, 192.0, 24.0, 20.0 ],
					"style" : "",
					"text" : "y"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.936553, 0.9512, 0.726506, 0.71 ],
					"fontface" : 0,
					"id" : "obj-30",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 42.5, 192.0, 24.0, 20.0 ],
					"style" : "",
					"text" : "x"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.936553, 0.9512, 0.726506, 0.71 ],
					"fontface" : 0,
					"id" : "obj-29",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 123.0, 148.0, 156.0, 20.0 ],
					"style" : "",
					"text" : "unpake 2 floating list value"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.936553, 0.9512, 0.726506, 0.71 ],
					"fontface" : 0,
					"id" : "obj-27",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 129.0, 114.0, 105.5, 20.0 ],
					"style" : "",
					"text" : "route msg into list"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.936553, 0.9512, 0.726506, 0.71 ],
					"fontface" : 0,
					"id" : "obj-26",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 18.0, 391.0, 554.0, 20.0 ],
					"style" : "",
					"text" : "Arduino <-> Max Serial communicate"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.702269, 0.811747, 0.303388, 0.36 ],
					"id" : "obj-22",
					"linecount" : 10,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 354.0, 507.0, 158.0, 141.0 ],
					"style" : "",
					"text" : "// Exampe Arduino code:\n\nvoid setup() {\nSerial.begin(9600);\n}\n\nvoid loop() {\nSerial.write(random(0,9));\ndelay(400);\n}"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.936553, 0.9512, 0.726506, 0.71 ],
					"fontface" : 0,
					"id" : "obj-82",
					"linecount" : 6,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 18.0, 417.0, 554.0, 87.0 ],
					"style" : "",
					"text" : "Trouble shooting:\nA) The message being sent to serial in max needs to be coming from a Serial.write command. Serial.println won't work.\nB) Arduino must be closed when running the Max patch, and/or the serial monitor needs to be closed in Arduino (Only one program can be accessing serial at a time).\nC) Only one Max \"serial\" object can be polling the serial at any given time (similarly to point B above)."
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.495624, 0.529709, 0.636972, 0.26 ],
					"id" : "obj-80",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 113.5, 707.0, 220.0, 20.0 ],
					"style" : "",
					"text" : "Prints data from serial to this messsage"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.495624, 0.529709, 0.636972, 0.26 ],
					"id" : "obj-79",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 92.5, 740.0, 213.0, 20.0 ],
					"style" : "",
					"text" : "Prints data from serial to Max console"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.495624, 0.529709, 0.636972, 0.26 ],
					"id" : "obj-78",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 86.5, 581.0, 242.0, 20.0 ],
					"style" : "",
					"text" : "Rate at which the serial port is being polled"
				}

			}
, 			{
				"box" : 				{
					"bubble" : 1,
					"id" : "obj-77",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 54.5, 542.0, 186.0, 24.0 ],
					"style" : "",
					"text" : "4) Start polling the serial port"
				}

			}
, 			{
				"box" : 				{
					"bubble" : 1,
					"id" : "obj-76",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 108.0, 655.5, 404.0, 37.0 ],
					"style" : "",
					"text" : "2) Make sure the letter matches the port you want to poll\n3) Make sure the baud rate matches the baud rate in the Arduino patch"
				}

			}
, 			{
				"box" : 				{
					"bubble" : 1,
					"id" : "obj-75",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 86.5, 611.0, 261.0, 37.0 ],
					"style" : "",
					"text" : "1) Print to the Max console a list containing items attached to serial ports"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-45",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 44.5, 617.0, 34.0, 22.0 ],
					"style" : "",
					"text" : "print"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-41",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 22.0, 740.0, 57.0, 22.0 ],
					"style" : "",
					"text" : "print raw"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-28",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 51.0, 707.0, 50.0, 22.0 ],
					"style" : "",
					"text" : "8"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-9",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "" ],
					"patching_rect" : [ 22.0, 663.0, 79.0, 22.0 ],
					"style" : "",
					"text" : "serial e 9600"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-23",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 22.0, 580.0, 58.0, 22.0 ],
					"style" : "",
					"text" : "metro 50"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-24",
					"maxclass" : "toggle",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 22.0, 542.0, 24.0, 24.0 ],
					"style" : ""
				}

			}
, 			{
				"box" : 				{
					"bubble" : 1,
					"id" : "obj-16",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 146.0, 78.0, 150.0, 24.0 ],
					"style" : "",
					"text" : "simple OSC reciver"
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-10",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 153.5, 192.0, 50.0, 22.0 ],
					"style" : ""
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-8",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 65.5, 192.0, 50.0, 22.0 ],
					"style" : ""
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-6",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "float", "float" ],
					"patching_rect" : [ 41.0, 146.0, 76.0, 22.0 ],
					"style" : "",
					"text" : "unpack 0. 0."
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-5",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 41.0, 112.0, 85.0, 22.0 ],
					"style" : "",
					"text" : "route /coord/1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 41.0, 78.0, 99.0, 22.0 ],
					"style" : "",
					"text" : "udpreceive 4343"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"source" : [ "obj-23", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-23", 0 ],
					"source" : [ "obj-24", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"source" : [ "obj-45", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-6", 0 ],
					"source" : [ "obj-5", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-10", 0 ],
					"source" : [ "obj-6", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"source" : [ "obj-6", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-28", 1 ],
					"order" : 0,
					"source" : [ "obj-9", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-41", 0 ],
					"order" : 1,
					"source" : [ "obj-9", 0 ]
				}

			}
 ],
		"dependency_cache" : [  ],
		"autosave" : 0,
		"styles" : [ 			{
				"name" : "AudioStatus_Menu",
				"default" : 				{
					"bgfillcolor" : 					{
						"type" : "color",
						"color" : [ 0.294118, 0.313726, 0.337255, 1 ],
						"color1" : [ 0.454902, 0.462745, 0.482353, 0.0 ],
						"color2" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
						"angle" : 270.0,
						"proportion" : 0.39,
						"autogradient" : 0
					}

				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "newobjBlue-1",
				"default" : 				{
					"accentcolor" : [ 0.317647, 0.654902, 0.976471, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "newobjCyan-1",
				"default" : 				{
					"accentcolor" : [ 0.029546, 0.773327, 0.821113, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "newobjGreen-1",
				"default" : 				{
					"accentcolor" : [ 0.0, 0.533333, 0.168627, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "newobjMagenta-1",
				"default" : 				{
					"accentcolor" : [ 0.840663, 0.060168, 0.769195, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "newobjYellow-1",
				"default" : 				{
					"fontsize" : [ 12.059008 ],
					"accentcolor" : [ 0.82517, 0.78181, 0.059545, 1.0 ]
				}
,
				"parentstyle" : "",
				"multi" : 0
			}
 ]
	}

}
