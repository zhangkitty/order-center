#!/bin/bash

svn_dir=~/Desktop/order/trunk/order_dist

\cp -rf ./dist $svn_dir

cd $svn_dir/dist && svn add zh/* && svn add en/* && svn commit -m 'update front code'

