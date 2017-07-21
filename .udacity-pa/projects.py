import argparse
import shutil
import os
from udacity_pa import udacity

nanodegree = 'nd889'
projects = ['vui_alexa']
filenames_all = ['speechAssets/IntentSchema.json',
                 'speechAssets/SampleUtterances_en_US.txt',
                 'src/index.js',
                 'src/facts.js',
                 'skill_simulator.png']

def submit(args):
  filenames = []
  for filename in filenames_all:
    if os.path.isfile(filename):
      filenames.append(filename)
    else:
      print("Warning: %s not found." % filename)

  udacity.submit(nanodegree, projects[0], filenames, 
                 environment = args.environment,
                 jwt_path = args.jwt_path)
