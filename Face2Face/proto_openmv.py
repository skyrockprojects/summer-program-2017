# Untitled - By: HsienYu - Thu Jun 15 2017

import sensor, time, image
from pyb import Servo


# Reset sensor
sensor.reset()

# Sensor settings
sensor.set_contrast(1)
sensor.set_gainceiling(16)
# HQVGA and GRAYSCALE are the best for face tracking.
sensor.set_framesize(sensor.HQVGA)
sensor.set_pixformat(sensor.GRAYSCALE)
#sensor.__write_reg(0x0C, sensor.__read_reg(0x0C) | (1 << 7)) #Flips Camera

s1 = Servo(1) # servo on position 1 (PD12, VIN, GND)
s2 = Servo(2) # servo on position 1 (PD13, VIN, GND)


# Load Haar Cascade
# By default this will use all stages, lower satges is faster but less accurate.
face_cascade = image.HaarCascade("frontalface", stages=15)
print(face_cascade)

# fuction for face
def find_face():
    for i in range(0, 30):
        img = sensor.snapshot()
    while (True):
        img = sensor.snapshot()
        objects = img.find_features(face_cascade, threshold=0.65, scale=1.65)
        for r in objects:
            img.draw_rectangle(r)
            try:
                kpts1 = img.find_keypoints(threshold=32, normalized=False, roi=objects[0])
            except:
                continue
            if kpts1:
                img.draw_keypoints(kpts1)
                time.sleep(100)
                return kpts1

# FPS clock
clock = time.clock()

kpts1 = find_face()

while (True):
    clock.tick()
    img = sensor.snapshot()
    try:
        kpts2 = img.find_keypoints(threshold=32, normalized=False)
    except:
        continue

    if (kpts2==None):
        continue

    c=img.match_keypoints(kpts1, kpts2, 70)
    if (c):
        l=10
        img.draw_line((c[0]-l,  c[1],  c[0]+l, c[1]))
        img.draw_line((c[0],  c[1]-l,  c[0], c[1]+l))
        s1.angle(c[0], 500)
        s2.angle(c[0], 500)
        time.sleep(20)
    print (clock.fps())





