package wooteco.subway.admin.repository;

import static org.assertj.core.api.Assertions.*;

import java.time.LocalTime;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.jdbc.DataJdbcTest;

import wooteco.subway.admin.domain.Line;

@DataJdbcTest
class LineRepositoryTest {
    private Line line = new Line("강남역", LocalTime.of(5, 30), LocalTime.of(23, 30), 10);
    @Autowired
    private LineRepository lineRepository;

    @Test
    void save() {
        Line persistLine = lineRepository.save(line);

        assertThat(persistLine.getId()).isNotNull();
    }

    @Test
    void findByName() {
        lineRepository.save(line);

        Line result = lineRepository.findByName(line.getName()).get();

        assertThat(result.getName()).isEqualTo("강남역");
    }

    @Test
    void deleteByName() {
        lineRepository.save(line);
        lineRepository.delete(line);

        assertThat(lineRepository.findByName("강남역").isPresent()).isFalse();
    }


}
