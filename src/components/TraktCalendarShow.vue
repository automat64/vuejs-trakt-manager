<template>
    <div id="trakt-calendar-show" class="tile">
        <div class="show-container">
            <span class="calendar-date">{{this.aired_day}} {{this.aired_month}}</span>
            <span class="calendar-show">{{ this.show.show.title}}</span>
            <span class="calendar-episode">S03E12</span>
            <span class="calendar-title">{{ this.show.title}}</span>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'TraktCalendarShow',
        props: ['show'],
        data: function () {
            return {
             
            };
        },
        computed: {
            aired_day: function () {
               let date = new Date(this.show.aired);
               return date.getUTCDay();
            },
            aired_month: function () {
               let date = new Date(this.show.aired);
               return date.toLocaleString("en-us", { month: "short" });
            },
        },
        created: function () {

            
        },
        mounted: function () {
            
        },
        methods: {
           
        },
        components: {
            
        },
    }
</script>

<style lang="scss">
    
</style>