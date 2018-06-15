function getAverage(measurements, i, size) {
	const boundary = (size - 1) / 2;
	const validValues = Array.from(Array(boundary)).reduce((acc, item, j) => {
		if (!acc) {
			return acc;
		}

		if (measurements[i - (j + 1)] && measurements[i + (j + 1)]) {
			return true;
		}

		return false;
	}, true);

	if (!validValues) {
		return undefined;
	}

	let sum = measurements[i].temperature;

	Array.from(Array(boundary)).map((item, j) => {
		sum += measurements[i - (j + 1)].temperature;
		sum += measurements[i + (j + 1)].temperature;

		return sum;
	});

	const average = sum / size;

	return {
		...measurements[i],
		temperature: average,
	};
}

function movingAverageFilter(measurements, size) {
	return measurements.map((m, i) => {
		const mean = getAverage(measurements, i, size);

		if (!mean) {
			return m;
		}

		return mean;
	});
}

function reduceFilter(measurements, size) {
	return measurements.reduce((acc, cur, i) => {
		// 0 1 2 3 4 5 6 7 8
		//   ^     ^     ^
		if ((i + 1) % size === 0) {
			return [...acc, getAverage(measurements, i - 1, size)];
		}

		return acc;
	}, []);
}

export default {
  movingAverageFilter,
  reduceFilter,
};