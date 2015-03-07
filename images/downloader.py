import urllib2
shapes = ['squiggle', 'oval', 'diamond']
colors = ['blue', 'green', 'red']
fills = ['open', 'solid', 'striped']
for shape in shapes:
 for color in colors:
  for fill in fills:
   request = urllib2.Request('http://smart-games.org/images/%s_%s_%s.png' % (shape, fill, color))
   response = urllib2.urlopen(request)
   image = response.read()
   f = open('%s_%s_%s.png' % (shape, fill, color), 'w')
   f.write(image)
   f.close()

