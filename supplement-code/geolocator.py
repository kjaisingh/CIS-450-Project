# -*- coding: utf-8 -*-
"""Untitled0.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1t-lgZh5d7NDuwFjf_6erxwD3w7Pym7ud
"""

import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

bar = pd.read_csv("/content/bar_locations.csv")
bar

bar['geom'] = bar['Latitude'].map(str) + ', ' + bar['Longitude'].map(str)

import pandas as pd
import geopandas as gpd
import geopy
from geopy.geocoders import Nominatim
from geopy.extra.rate_limiter import RateLimiter
import matplotlib.pyplot as plt
import tqdm
from tqdm._tqdm_notebook import tqdm_notebook

locator = Nominatim(user_agent = 'myGeocoder', timeout=10)
rgeocode = RateLimiter(locator.reverse, min_delay_seconds=0.001)

print(locator.reverse('40.544096088789225,-74.14115468967245').raw['display_name'])

bar['address'] = locator.reverse(bar['geom']).raw['display_name']

bars = bar.head(20)

bar['address'] = bar['geom'].apply(lambda x: locator.reverse(x).raw['display_name'])

output = bar[["Latitude", "Longitude", "address"]]
output

output['address'] = output['address'].astype(str)

output.to_csv('addressClean.csv')