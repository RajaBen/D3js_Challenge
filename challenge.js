//importation et affichage des données
/*d3.csv("data/academic-questionnaire.csv").get(function(error,data){
    console.log(data);
});*/

function main() {
    var svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;

    var xScale = d3.scaleBand().range([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range([height, 0]);
    var g = svg.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");

    d3.csv("data/academic-questionnaire.csv").get(function (error, data) {
        xScale.domain(data.map(function (d) {
            console.log(d.gender)
            return d.gender;
        }));

        yScale.domain([0, d3.max(data, function (d) {
            return d.number_of_repetition;
        })]);

        g.append("g").attr('transform', 'translate(0,' + height + '0)')
            .call(d3.axisBottom(xScale))

        g.append('g')
            .call(d3.axisLeft(yScale).tickFormat(function (d) {
                return d;
            }).ticks(10))

        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")

            .attr("x", function (d) {
                return xScale(d.gender);
            })

            .attr("y", function (d) {
                return xScale(d.number_of_repetition);
            })

            .attr("width", xScale.bandwidth())

            .attr("height", function (d) {
                return height - yScale(d.number_of_repetition);
            });
    });
}