<template>
  <div class="poster__Button">
    <el-popover
      ref="popover4"
      placement="bottom"
      width="400"
      trigger="click">

      <div class="poster__Column">
        <h4 style="">{{ $t('city') }}</h4>
        <!--<div class="el-transfer-panel__filter el-input el-input&#45;&#45;small"><i class="el-input__icon el-icon-search"></i><input autocomplete="off" placeholder="Поиск" size="small" icon="search" type="text" rows="2" validateevent="true" class="el-input__inner"></div>-->

        <ul v-for="city in cities" style="margin: 0;padding: 0;">
          <li style="list-style: none;font-size: 12px;color:#8DAFE1;padding: 3px 1px 3px 1px;">
            {{ $t('rostov_na_donu') }}
          </li>
        </ul>
      </div>

      <div class="poster__Column">
        <h4 style="">{{ $t('poster') }}</h4>

        <ul v-for="city in cities" style="margin: 0;padding: 0;">
          <li style="list-style: none;font-size: 12px;color: #6984a8;">
            <!--<a :href="city.chanel_link" class="poster_link">{{ city.city }}</a>-->
            <a :href="city.chat_link" class="poster_link">{{ $t('rostov_na_donu') }}</a>
          </li>
        </ul>
      </div>

      <div class="poster__Column">
        <h4 style="">{{ $t('chat') }}</h4>

        <ul v-for="city in cities" style="margin: 0;padding: 0;">
          <li style="list-style: none;font-size: 12px;color: #6984a8;">
            <!--<a :href="city.chat_link" class="poster_link">{{ city.city }}</a>-->
            <a :href="city.chat_link" class="poster_link">{{ $t('rostov_na_donu') }}</a>
          </li>
        </ul>
      </div>

      <div class="poster__Column">
        <h4 style="">{{ $t('mapala_group') }}</h4>

        <ul v-for="city in cities" style="margin: 0;padding: 0;">
          <li style="list-style: none;font-size: 12px;color: #6984a8;">
            <router-link :to="{ path: '/group/' + city.name }" class="poster_link">{{ $t('rostov_na_donu') }}</router-link>
          </li>
        </ul>
      </div>
    </el-popover>


    <el-button v-popover:popover4>
      {{ $t('poster') }}
      <span class="caret"></span>
    </el-button>
  </div>
</template>

<script>
  import { Group } from '@/api/services'

  export default {
    mounted () {
      Group.query().then(response => {
        this.cities = response.data
      })
    },

    data () {
      return {
        gridData: [{
          date: '2016-05-02',
          name: 'Jack',
          address: 'New York City'
        }, {
          date: '2016-05-04',
          name: 'Jack',
          address: 'New York City'
        }, {
          date: '2016-05-01',
          name: 'Jack',
          address: 'New York City'
        }, {
          date: '2016-05-03',
          name: 'Jack',
          address: 'New York City'
        }],
        cities: {}
      }
    },

    methods: {}
  }
</script>

<style scoped>
  .caret {
    display: inline-block;
    width: 0;
    height: 0;
    vertical-align: middle;
    border-top: 4px dashed;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    margin-left: 6px;
  }
  .poster__Button {
    margin-left: 10px;
    display: flex;
  }

  .poster__Button .el-button {
    background: transparent !important;
    border: none !important;
    font-size: 12px !important;
    color: #8DAFE1 !important;
  }

  @media screen and (max-width: 900px) {
    .poster__Button {
      display: none;
    }
  }

</style>
