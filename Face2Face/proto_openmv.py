# Untitled - By: HsienYu - Thu Jun 15 2017

import sensor, time, image, math
from pyb import Servo


# Reset sensor
sensor.reset()

# Sensor settings
sensor.set_contrast(1)
sensor.set_gainceiling(16)
# HQVGA and GRAYSCALE are the best for face tracking.
sensor.set_framesize(sensor.HQVGA)
sensor.set_pixformat(sensor.GRAYSCALE)
sensor.__write_reg(0x0C, sensor.__read_reg(0x0C) | (1 << 7)) #Flips Camera

s1 = Servo(1) # servo on position 1 (PD12, VIN, GND)
s2 = Servo(2) # servo on position 1 (PD13, VIN, GND)


# Load Haar Cascade
# By default this will use all stages, lower satges is faster but less accurate.
face_cascade = image.HaarCascade("frontalface", stages=15)

# Default Pan/Tilt for the camera in degrees.
# Camera range is from -90 to 90
cam_pan = 60
cam_tilt = 60

# Turn the camera to the default position
"""
s1.angle(0,0)
s2.angle(60-90,0)
"""
def remap( x, oMin, oMax, nMin, nMax ):

    #range check
    if oMin == oMax:
        return None

    if nMin == nMax:
        return None

    #check reversed input range
    reverseInput = False
    oldMin = min( oMin, oMax )
    oldMax = max( oMin, oMax )
    if not oldMin == oMin:
        reverseInput = True

    #check reversed output range
    reverseOutput = False
    newMin = min( nMin, nMax )
    newMax = max( nMin, nMax )
    if not newMin == nMin :
        reverseOutput = True

    portion = (x-oldMin)*(newMax-newMin)/(oldMax-oldMin)
    if reverseInput:
        portion = (oldMax-x)*(newMax-newMin)/(oldMax-oldMin)

    result = portion + newMin
    if reverseOutput:
        result = newMax - portion

    return result


while True:
    img = sensor.snapshot()
    FRAME_W = img.width()
    FRAME_H = img.height()

    objects = img.find_features(face_cascade, threshold=0.65, scale=1.65)

    for r in objects:
       img.draw_rectangle(r)
       # Get the center of the face
       face_x = r[0] + (r[2]/2)
       face_y = r[1] + (r[3]/2)
       # Correct relative to center of image
       turn_x  = float(face_x - (FRAME_W/2))
       turn_y  = float(face_y - (FRAME_H/2))

       # Convert to percentage offset
       turn_x  /= float(FRAME_W/2)
       turn_y  /= float(FRAME_H/2)

       # Scale offset to degrees
       turn_x   *= 2.5 # VFOV
       turn_y   *= 2.5 # HFOV
       cam_pan  += turn_x
       cam_tilt += turn_y

       #print(cam_pan-90, cam_tilt-90)


       # Clamp Pan/Tilt to 0 to 180 degrees
       cam_pan = max(0,min(180,cam_pan))
       cam_tilt = max(0,min(180,cam_tilt))

       print(cam_pan, cam_tilt)

       #servo update
       s2.angle(cam_pan)
       time.sleep(10)
       s1.angle(cam_tilt)
       time.sleep(10)



