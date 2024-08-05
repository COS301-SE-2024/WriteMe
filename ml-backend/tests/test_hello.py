"""Hello unit test module."""

from ml_backend.hello import hello


def test_hello():
    """Test the hello function."""
    assert hello() == "Hello ml-backend"
