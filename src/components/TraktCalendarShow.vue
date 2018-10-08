<template>
    <div id="trakt-calendar-show" class="columns">
        <div  class="calendar-date column is-vcentered is-one-fifth has-text-centered">
            <div class="calendar-day has-text-primary is-size-4">
                {{this.aired_day}}
            </div>
            <div class="calendar-month has-text-black-ter is-size-5">
                {{this.aired_month}}
            </div>
        </div>
        <div class="calendar-show column is-vcentered is-two-fifths has-text-centered">{{ this.show.show.title}} S{{this.season}}E{{this.episode}}</div >
        <div class="calendar-title column is-vcentered is-two-fifths has-text-centered">{{ this.show.title}}</div >
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
            aired_day () {
               let date = new Date(this.show.aired);
               return date.toLocaleString("en-us", { day: "numeric" });
            },
            aired_month: function () {
               let date = new Date(this.show.aired);
               return date.toLocaleString("en-us", { month: "short" });
            },
            season: function () {
                return (this.show.season < 10 ? '0' : '') + this.show.season;
            },
            episode () {
                return (this.show.number < 10 ? '0' : '') + this.show.number;
            }
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
#trakt-calendar-show {
    border-bottom: 1px solid;
    .column {
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
    }
    .calendar-date {
        flex-direction: column;
    }
}
</style>