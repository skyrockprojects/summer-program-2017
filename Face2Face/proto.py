import cv2
import sys
import serial
from OSC import OSCClient, OSCMessage

# remap value fuction
def remap( x, oMin, oMax, nMin, nMax ):

    #range check
    if oMin == oMax:
        print "Warning: Zero input range"
        return None

    if nMin == nMax:
        print "Warning: Zero output range"
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




#cascPath = sys.argv[0]
#print cascPath
cascPath = "haarcascade_frontalface_default.xml"

faceCascade = cv2.CascadeClassifier(cascPath)

video_capture = cv2.VideoCapture(0)

#init OSC object

client = OSCClient()
client.connect( ("localhost", 4343) )


#init serial conmunication
"""
ser = serial.Serial('/dev/cu.usbmodem1421', 9600)
"""

while True:
    # Capture frame-by-frame
    ret, frame = video_capture.read()

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faces = faceCascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=10,
        minSize=(30, 30),
        flags=cv2.cv.CV_HAAR_SCALE_IMAGE
    )

    # Draw a rectangle around the faces
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
        #re coordinate center of x, y
        re_x = x + w/2
        final_x = remap(re_x, 0, video_capture.get(cv2.cv.CV_CAP_PROP_FRAME_WIDTH), -1.0, 1.0 )
        re_y = y + h/2
        final_y = remap(re_y, 0, video_capture.get(cv2.cv.CV_CAP_PROP_FRAME_HEIGHT), -1.0, 1.0 )
        print ("x: %.2f y:%.2f" % (final_x, final_y)) 
        
        # OSC send
        
        client.send( OSCMessage("/coord/1", [final_x, final_y] ) )

        
        # serial <> arduino
        """
        ser.write(b'%.2f,%.2f,' % (final_x, final_y))
        """

    # Display the resulting frame
    cv2.imshow('Video', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# When everything is done, release the capture
video_capture.release()
cv2.destroyAllWindows()

