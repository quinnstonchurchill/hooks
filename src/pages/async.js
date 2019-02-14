import React, { Component, Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Flex, Text, Image, Box, Button } from '@setlife/ui';
import { FetchHooks } from '../components/Fetch';

const endpoint = 'https://rickandmortyapi.com/api/character';

export default FetchHooks;
