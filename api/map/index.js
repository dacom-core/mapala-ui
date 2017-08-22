import { resource } from '../index'
import axios from 'axios'

export const Marker = {
  ...resource('markers/', axios, {})
}
