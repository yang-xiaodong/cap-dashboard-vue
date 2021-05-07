<template>
  <span class="metric metric-danger highlighted">22</span>
</template>

<style>
span.metric {
  -moz-transition: color 0.1s ease-out, background 0.1s ease-out,
    border 0.1s ease-out;
  -ms-transition: color 0.1s ease-out, background 0.1s ease-out,
    border 0.1s ease-out;
  -o-transition: color 0.1s ease-out, background 0.1s ease-out,
    border 0.1s ease-out;
  -webkit-transition: color 0.1s ease-out, background 0.1s ease-out,
    border 0.1s ease-out;
  background-color: transparent;
  border: solid 1px;
  border-radius: 10px;
  display: inline-block;
  font-size: 12px;
  line-height: 1;
  min-width: 10px;
  padding: 2px 6px;
  text-align: center;
  transition: color 0.1s ease-out, background 0.1s ease-out,
    border 0.1s ease-out;
  vertical-align: baseline;
  white-space: nowrap;
}

span.metric.highlighted {
  color: #fff !important;
  font-weight: bold;
}

span.metric-default {
  border-color: #777;
  color: #777;
}

span.metric-default.highlighted {
  background-color: #777;
}

div.metric {
  -ms-border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  border: solid 1px transparent;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  transition: color 0.1s ease-out, background 0.1s ease-out,
    border 0.1s ease-out;
}

div.metric .metric-body {
  font-size: 26px;
  padding: 15px 15px 0;
  text-align: center;
}

div.metric .metric-description {
  padding: 0 15px 15px;
  text-align: center;
}

div.metric.metric-default {
  border-color: #ddd;
}

div.metric-info,
span.metric-info {
  border-color: #5bc0de;
  color: #5bc0de;
}

span.metric-info.highlighted {
  background-color: #5bc0de;
}

div.metric-warning,
span.metric-warning {
  border-color: #f0ad4e;
  color: #f0ad4e;
}

span.metric-warning.highlighted {
  background-color: #f0ad4e;
}

div.metric-success,
span.metric-success {
  border-color: #5cb85c;
  color: #5cb85c;
}

span.metric-success.highlighted {
  background-color: #5cb85c;
}

div.metric-danger,
span.metric-danger {
  border-color: #d9534f;
  color: #d9534f;
}

span.metric-danger.highlighted {
  background-color: #d9534f;
}

span.metric-null,
div.metric-null {
  display: none;
}
</style>